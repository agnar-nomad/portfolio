import React from 'react';
import 'boxicons';
import { createPortal } from 'react-dom';
import './Modal.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import errorImg from '../../assets/images/errorNFTimage.png';

const Modal = ({ show, children, onClose, modalInfo, modalInfoLoading }) => {
  if (!show) return null;

  const handleImgLoadError = function (e) {
    // prevent an infinite error loop
    e.target.onerror = null;
    // default image add, if associated image is not available...
    e.target.src = errorImg;
  };

  return createPortal(
    <>
      <div onClick={onClose} className="overlay"></div>
      <div className="modal">
        <button className="modal__btn" onClick={onClose}>
          Close
        </button>

        {modalInfoLoading ? (
          <box-icon
            class="spinner"
            name="loader"
            color="white"
            animation="spin"
            size="3em"></box-icon>
        ) : (
          <div className="modal__gallery">
            {modalInfo.map((nft) => (
              <div
                key={`${nft.contractAddress}/${nft.tokenId}`}
                className="modal-nft-card">
                {/* <img src={nft.imageUrl} alt={nft.name} /> */}
                <LazyLoadImage
                  src={nft.imageUrl}
                  alt={nft.name}
                  effect="blur"
                  height={200}
                  width={200}
                  onError={(e) => handleImgLoadError(e)}
                />
                <span>{nft.name || `${nft.symbol} ${nft.tokenId}`}</span>
              </div>
            ))}
          </div>
        )}
        {!modalInfo ? (
          <p>There seems to be an issue loading your NFTs. Please try again.</p>
        ) : null}

        <p>{children}</p>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
