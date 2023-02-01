# Cloudheadz NFT Portfolio and Treasury

This is a working demo version of a blockchain portfolio app, being built for the Cloudheadz NFTs project, residing on the Avalanche network. This is my first contract work for a live application (while being friendly with the Cloudheadz team for quite some time) and it is forcing me to learn at an incredible rate, if I want to move forward.

#### The app is an overview/dashboard app for a web3 project's assets and another way to connect with its community. It shows the current state of the treasury (coins and NFTs) holdings on the Avax network. Other chains are planned to be added as the project expands, to eventually build a total aggregator of cross-chain assets. Staking and Liquidity Provider positions will be added as well. Another feature is the User portfolio which enables a user to easily check and see which collections of this project they are holding currently.

A live demo is available at this [URL](https://cloudheadz-portfolio-demo-agnar.netlify.app/).

The project was built in React 18, with Vite 3.2, and libraries like ethers, wagmi, ankr.js or react-lazy-load-image. Parts of this app were inspired by [Hashlips](https://hashlips.online/HashLips)

### Usage

- Home page shows total holdings of the main treasury wallet, more wallets and staking will be added
- NFT portfolio page shows the holdings of the NFT treasury wallet
- Connect your wallet on the User portfolio page and it will show which collections you are a holder of
- Click an image of the User portfolio, a popup will show exactly which NFTs are in your wallet
