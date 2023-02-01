import React from 'react';
import './NftTreasury.css';
import { useEffect, useState } from 'react';
import { treasuryNftFilterArray } from '../data/data.js';
import { getNfts } from '../../apis';
import errorImg from '../assets/images/errorNFTimage.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ipfsGateways = {
  cloudflare: 'https://cf-ipfs.com',
  filebase: 'https://ipfs.filebase.io',
  ipfs: 'https://gateway.ipfs.io',
  nftStorage: 'https://nftstorage.link',
  pinata: 'https://gateway.pinata.cloud',
};

// const myAddress = '0x845C36aCb8133Bc0a50b4FB432356647367d5081';
const treasuryAddress = import.meta.env.VITE_CH_TREASURY_ADDRESS; //CH treasury

export default function NftTreasury() {
  const [treasuryNfts, setTreasuryNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getNFTHolding = async function () {
    try {
      const { nfts } = await getNfts(
        treasuryAddress,
        'avalanche',
        40,
        treasuryNftFilterArray
      );
      setTreasuryNfts(nfts);
    } catch (err) {
      console.error('💥🔴👇 Treasury: ', err.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getNFTHolding();
    setIsLoading(false);
  }, [treasuryAddress]);

  return (
    <div className="holdings-wrapper">
      <h1 className="holdings__title">CloudHeadz NFT portfolio</h1>
      <p className="holdings__subtitle">
        [Working DEMO for client] <br />
        The Cloudheadz treasury currently holds these NFTs (length can be
        adjusted, eventually paginated)
      </p>

      <div className="nft-grid">
        {isLoading ? <p>Loading NFTs.....</p> : <AllNFTs nfts={treasuryNfts} />}
      </div>
    </div>
  );
}

function AllNFTs({ nfts }) {
  const handleImgLoadError = function (e) {
    // prevent an infinite error loop
    e.target.onerror = null;
    // default image add, if associated image is not available...
    e.target.src = errorImg;
  };

  const elementsToDisplay = nfts.map((nft) => {
    const imgSource = nft.imageUrl.includes('ipfs/')
      ? `${ipfsGateways.nftStorage}/ipfs/${nft.imageUrl.split('ipfs/')[1]}`
      : nft.imageUrl;

    return (
      <div
        key={`${nft.contractAddress}/${nft.tokenId}`}
        className=" nft-grid__card nft-card">
        <LazyLoadImage
          className="nft-grid__card__img"
          src={imgSource}
          alt={nft.name}
          effect="blur"
          height={180}
          width={180}
          // placeholderSrc={errorImg}
          onError={(e) => handleImgLoadError(e)}
        />
        <a href={nft.imageUrl} target="_blank" rel="noopener noreferrer">
          <span className="nft-grid__card__name">
            {nft.name || `${nft.symbol} ${nft.tokenId}`}
          </span>
        </a>
      </div>
    );
  });
  return elementsToDisplay;
}
