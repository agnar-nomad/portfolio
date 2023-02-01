import React from 'react';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import coins from '../data/coins.js';
import './Home.css';
import avaxLogo from '../assets/logos/avax-logo.svg';

const abiERC20Simple = [
  // Some details about the token
  'function name() view returns (string)',
  'function symbol() view returns (string)',

  // Get the account balance
  'function balanceOf(address) view returns (uint)',

  // Send some of your tokens to someone else
  'function transfer(address to, uint amount)',

  // An event triggered whenever anyone transfers to someone else
  'event Transfer(address indexed from, address indexed to, uint amount)',
];

// const myAddress = '0x845C36aCb8133Bc0a50b4FB432356647367d5081';
const treasuryAddress = import.meta.env.VITE_CH_TREASURY_ADDRESS;

const coinLogoSize = 22;

const Home = () => {
  const [accountAvaxBalance, setAccountAvaxBalance] = useState('');
  const [holdings, setHoldings] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.ankr.com/avalanche'
  );

  // get balance of the native coin Avax (Ether) in nAVAX (wei)
  async function getNativeBalance() {
    try {
      const avaxBalancePromise = await provider.getBalance(treasuryAddress); // balance as BigInt (in wei)
      const formattedBalance = Number(
        ethers.utils.formatUnits(avaxBalancePromise, 18)
      ).toFixed(2); // format the native balance to a human-readable format

      setAccountAvaxBalance(formattedBalance); // set State
    } catch (err) {
      console.error(`💥: ${err.message}`);
    }
  }

  // get balance of any coin in its own decimal notation
  const getCoinBalance = async function (coin, abi, provider, walletAddress) {
    try {
      const contract = new ethers.Contract(coin.address, abi, provider); // establish where you want to query
      const balancePromise = await contract.balanceOf(walletAddress); // query balance based on above parameters, this is in base units

      const balance = Number(
        ethers.utils.formatUnits(balancePromise, coin.decimals)
      ).toFixed(2); // format to human-readable format based on its own decimal number

      // console.log('line 57: ', coin.name, balance);

      return {
        name: coin.name,
        id: coin.id,
        symbol: coin.symbol,
        balance: balance,
        logoImage: coin.logo_url,
      }; // return as promise from this async function
      // returns the gathered data
    } catch (err) {
      console.error('💥🔴👇: ', err.message);
    }
  };

  // get balance of all coins of interest, listed in coins.json, using the fetching function above
  const getAllBalances = async () => {
    const balancePromisesArray = coins.coinlist.map(
      async (item) =>
        await getCoinBalance(item, abiERC20Simple, provider, treasuryAddress)
    ); // returns promises from the fetching function, and forms and array of promises
    const resolvedArray = await Promise.all(balancePromisesArray); // the promises need to be resolved, results in an array of resolved values (array of array in this case)

    // console.log('line 74: ', resolvedArray);

    setHoldings(resolvedArray); // set result in state
  };

  useEffect(() => {
    getNativeBalance();
  }, []);

  useEffect(() => {
    getAllBalances();
  }, []);

  return (
    <div className="home__container">
      <section className="hero">
        <div className="hero__text">
          <p>[Working DEMO for client]</p>
          <h1 className="hero__text__title">CHZ</h1>
          <p className="hero__text__description">
            A deflationary NFT art collection built on Avalanche, with our
            holders in mind. Genesis Mint Day on April 9th, 2022 opened the
            floodgates for every person who owned at least 1 AVAX to become a
            member of La Familia. Burn 5 CloudHeadz NFTs to be put on the list
            for a 1 of 1 Custom Legendary made specifically for you by our
            artist: Mr. Wonderland. This Custom NFT will make you eligible for
            our “Drip” which has consisted of other Blue Chip NFTs including
            Chikn, Party Animals, Hopper, AVAX Warriors, Roostr, and many more!
          </p>
        </div>

        <article className="hero__card">
          <h2 className="hero__card__title">Treasury</h2>
          <p className="hero__card__subtitle">
            The Cloudheadz treasury currently holds these coins
          </p>
          <div className="hero__card__coin coin">
            <p className="coin__name">AVAX</p>
            <div className="coin__value">
              <span className="coin__value__number">
                {new Intl.NumberFormat('en-US').format(accountAvaxBalance)}{' '}
              </span>
              <span>
                <img
                  className="coin__value__logo"
                  src={avaxLogo}
                  alt="logo of AVAX cryptocurrency"
                  width={coinLogoSize}
                  height={coinLogoSize}
                />
              </span>
            </div>
          </div>
          <CoinsHeld holdings={holdings} />

          <div className="hero__card__summary">
            <h2 className="hero__card__summary__title">Total Value</h2>
            <p className="hero__card__summary__value">{`$ ..... (Static)`}</p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Home;

function CoinsHeld({ holdings }) {
  return holdings.map((coin) => (
    <div className="hero__card__coin coin" key={coin.id}>
      <p className="coin__name">{coin.name}</p>
      <div className="coin__value">
        <span className="coin__value__number">
          {new Intl.NumberFormat('en-US').format(coin.balance)}{' '}
        </span>
        <span className="coin__value__logo">
          <img
            src={coin.logoImage}
            alt={`${coin.name} cryptocurrency logo`}
            width={coinLogoSize}
            height={coinLogoSize}
          />
        </span>
      </div>
    </div>
  ));
}
