import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { goerli } from 'wagmi/chains';

import waitImg from '../assets/images/waiting-bird.jpg';
import successImg from '../assets/images/success.jpg';
import ProgressBar from '@ramonak/react-progress-bar';
import abi from '../assets/abi/contract-abi-testnet.js';

const contractConfig = {
  address: '0xC7123770F133F49eF4572e3d40595160e9ef9776',
  abi,
};

const Mint = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  const [mintAmount, setMintAmount] = useState(1);
  const { isConnected } = useAccount();
  console.log('=============================================');

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'mint',
    args: [mintAmount],
    chainId: goerli.id,
    overrides: {
      value: ethers.utils.parseEther((0.05 * mintAmount).toString()),
    },
    onSuccess(data) {
      console.log('WAGMI Prep Success ✅✅', data);
    },
    onError(error) {
      console.error('WAGMI Prep Error', '💥💥💥', error);
    },
  });
  console.log('line 51: Write Config: ', contractWriteConfig);

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);
  console.log('line 60: Write Contract: ', {
    mintData,
    mint,
    isMintLoading,
    isMintStarted,
    mintError,
  });

  const { data: totalSupplyData } = useContractRead({
    ...contractConfig,
    functionName: 'totalSupply',
    watch: true,
  });

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
    onSuccess(data) {
      console.log('WAGMI TX Success ✅✅', data);
    },
    onError(error) {
      console.error('WAGMI TX Error', '💥💥💥', error);
    },
  });
  console.log('line 84: Tx Data: ', { txData, txSuccess, txError });

  const isMinted = txSuccess;

  useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
  }, [totalSupplyData]);

  const freshNftID = parseInt(txData?.logs[0].topics[3], 16); // works well for 1 minted, not several
  const openSeaUrl = `https://testnets.opensea.io/assets/goerli/0xc7123770f133f49ef4572e3d40595160e9ef9776/${freshNftID}`;
  const etherscanUrl = `https://goerli.etherscan.io/tx/${txData?.transactionHash}`;
  console.log('line 102: URL ', etherscanUrl, openSeaUrl);

  return (
    <section
      id="mint"
      className="min-h-screen w-full grid sm:grid-flow-col md:grid-cols-2 items-center px-12 relative">
      <div className="flex flex-col justify-center">
        <p className="justify-self-start my-8 text-xs">
          (Connect to the Goerli testnet, and test-mint an NFT from the upcoming
          collection on Mainnet. Connect using an available wallet through
          Rainbow (top right). Price 0.05 GoerliETH. Amount 1-25 / tx)
        </p>
        <h2 className="pb-4 text-center">Mint a Baddie</h2>
        <p>
          Current progress: <span>{totalMinted}</span>{' '}
        </p>
        <ProgressBar
          completed={(totalMinted / 100) * 100}
          bgColor="#bd192c"
          ariaValuemax={100}
          ariaValuemin={0}
          margin="15px 0"
        />
        {mintError ? (
          <p className="text-red-500 py-4 px-2 text-sm shadow-md shadow-red-500 rounded">
            Error: Sorry, there was an error while minting. Please refresh page
            and try again.
          </p>
        ) : null}
        {txError ? (
          <p className="text-red-500 py-4">
            Error: Sorry, there was an issue with the transaction. Please
            refresh page and try again.
          </p>
        ) : null}
        <div className="flex items-center gap-8">
          <span>Amount (25/tx):</span>
          <input
            className="p-2 my-4 bg-neutral-50 text-[#002b40]"
            type="number"
            min="1"
            max="25"
            placeholder="How many?"
            defaultValue={1}
            onChange={(e) => {
              setMintAmount(e.target.value);
            }}
          />
        </div>
        {isConnected ? (
          <button
            disabled={isMintLoading || isMintStarted}
            className="mint-btn border-white bg-transparent p-4 border-2 inline-block max-w-fit"
            data-mint-loading={isMintLoading}
            data-mint-started={isMintStarted}
            onClick={() => {
              console.log('Mint clicked');
              if (mintAmount > 25) return;
              console.log(`Current mint amount: ${mintAmount}`);
              mint?.();
            }}>
            {isMintLoading && 'Waiting for approval'}
            {isMintStarted && 'Minting...'}
            {!isMintLoading && !isMintStarted && 'Mint'}
          </button>
        ) : null}
      </div>

      <div className="mint-image flex flex-col items-center">
        {isMinted ? (
          <img
            className="flipcard rounded-md shadow-inner m-8"
            src={successImg}
            alt="An image of people being happy about an achievement."
            width="300"
            height="300"
          />
        ) : (
          <img
            className="flipcard rounded-md shadow-inner m-8"
            src={waitImg}
            alt="A nice bird from Australia watching us."
            width="300"
            height="300"
          />
        )}

        {isMinted && (
          <div className="leading-loose">
            {' '}
            <p>NFT ID: {freshNftID}</p>
            <p>
              View on{' '}
              <a className="underline" target="_blank" href={etherscanUrl}>
                EtherScan
              </a>{' '}
            </p>
            <p>
              View on{' '}
              <a className="underline" target="_blank" href={openSeaUrl}>
                OpenSea
              </a>{' '}
            </p>
          </div>
        )}
      </div>
      <footer className="footer flex items-center justify-between absolute bottom-8 left-0 text-sm px-12">
        <div>
          <p>[Working DEMO for client]</p>
          &copy; Created by{' '}
          <a className="underline" href="https://github.com/agnar-nomad">
            Agnar
          </a>
        </div>
        <div></div>
      </footer>
    </section>
  );
};

export default Mint;
