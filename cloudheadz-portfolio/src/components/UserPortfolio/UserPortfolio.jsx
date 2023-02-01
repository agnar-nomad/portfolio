import { useState, useEffect } from 'react';
import './UserPortfolio.css';
import { ethers } from 'ethers';

import bananaz from '../../assets/images/babanaz.png';
import dgnzAddict from '../../assets/images/DEGN.png';
import cloudheadz from '../../assets/images/cloudheadz.png';
import smolnana from '../../assets/images/nanaz.png';
import monkeez from '../../assets/images/mnkz.png';

import abi_ch from '../../abi/abi_ch_main.json';
import { listOfNfts } from '../../data/data.js';
import Modal from './Modal';
import NftCard from './NftCard';
import { getNftsForModal } from '../../../apis';

function UserPortfolio() {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);
  const [nfts, setNfts] = useState(listOfNfts);

  // state for the Modal/Popup
  const [modalInfo, setModalInfo] = useState([]);
  const [modalInfoLoading, setModalInfoLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  // check connection with Metamask
  const initConnection = async () => {
    // if you have Metamask, there will be a window.ethereum object
    if (typeof window.ethereum !== 'undefined') {
      console.log('You have metamask'); // if we have a blockchain provider
      // we request the metamask provider to ask for accounts
      const accountsFromMetamask = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider); // save provider in state

      setAccount(accountsFromMetamask[0]); // set up a state for the account
    } else {
      console.log('Please install Metamask');
    }
  };

  // query the nft balance of your wallet on the provided contract
  const balance = async (nft) => {
    const contract = new ethers.Contract(nft.address, abi_ch, provider); // create a contract instance
    const tempBalance = await contract.balanceOf(account); // get your balance of this token
    const tempNfts = [...nfts]; // create a copy of your nftList array
    const tempNFT = tempNfts[tempNfts.findIndex((obj) => obj.id === nft.id)]; // find the currently processed nft in your nftList
    tempNFT.owner = tempBalance > 0; // set property true or false
    tempNFT.count = tempBalance.toString(); // set property
    setNfts({
      list: tempNfts,
    }); // set the copied and modified nftList as the new State
  };

  // load data from the blockchain into our nftList
  const checkCollection = () => {
    listOfNfts.forEach((nft) => {
      balance(nft);
    });
  };

  // on Load, check blockchain connection and connect to wallet
  useEffect(() => {
    initConnection();
  }, []);

  // load data from the blockchain when wallet address changes
  useEffect(() => {
    checkCollection();
  }, [account]);

  // Event listener for the clicking of an image, to get the detailed collection
  function clickImage(e) {
    if (!e.target.classList.contains('gallery-card__nft-image')) {
      console.log('line 81: ', 'This element is NOT an nft-image');
      return; // guard clause, if the click is not on an image, return
    } else {
      console.log('line 84: ', 'This element IS an nft-image');
      const { contractadd: contractAddress } = e.target.dataset;
      getNFTHoldingForModal(account, contractAddress, 20);
      setShowModal(handleShow);
    }
  }

  const getNFTHoldingForModal = async function (
    walletAddress,
    contractAddress
  ) {
    try {
      setModalInfoLoading(true);
      const { nfts } = await getNftsForModal(walletAddress, contractAddress); // retrieve all nfts of this collection in this wallet, using Ankr's SDK
      setModalInfo(nfts); // save info in State
      setModalInfoLoading(false);
    } catch (err) {
      console.error('💥🔴👇: ', err.message);
    }
  };

  const ModalContent = () => {
    return (
      <Modal
        show={showModal}
        onClose={handleClose}
        modalInfo={modalInfo}
        modalInfoLoading={modalInfoLoading}></Modal>
    );
  };

  return (
    <div className="user-portfolio-wrapper">
      <section className="user-portfolio__header">
        <p style={{ padding: '3rem 0' }}>
          [Working DEMO for client] <br />
          This page shows an NFT gallery with selected collections. The image
          opacity indicate whether the current wallet holds any NFT from the
          collection or not. Clicking on the collection image opens a popup and
          shows all the NFTs from this collection in this wallet. Make sure to
          sign-in with your wallet that holds some of these collections to see
          the effect.
        </p>
        {/* conditionally render button if account not available, otherwise show account number */}
        {account === '' ? (
          <span>
            <button
              onClick={initConnection}
              className="user-portfolio__header__btn">
              Connect Wallet
            </button>{' '}
            there will be a completely different button after testing period
          </span>
        ) : (
          <p>
            Connected account: {account.slice(0, 7)}...{account.slice(-5)}
          </p>
        )}
      </section>

      {/* render main area to display collections */}
      <section className="user-portfolio__content" onClick={clickImage}>
        <NftCard nft={listOfNfts[0]} image={cloudheadz} />
        <NftCard nft={listOfNfts[1]} image={dgnzAddict} />
        <NftCard nft={listOfNfts[2]} image={bananaz} />
        <NftCard nft={listOfNfts[3]} image={smolnana} />
        <NftCard nft={listOfNfts[4]} image={monkeez} />
      </section>

      {showModal ? <ModalContent /> : null}
    </div>
  );
}

export default UserPortfolio;
