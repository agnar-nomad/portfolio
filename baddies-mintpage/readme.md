# Retro Baddies NFT collection mint page

This is a working demo version of an NFT minting dApp, being built for a project on the Avalanche, Cardano and Ethereum blockchain networks. This app is a deep dive into web3 tools and libraries like ethers and wagmi for me. The Solidity part was written by my friend Raistilin, who develops smart contracts.

#### The app is a rather simple front-end app to communicate with a smart contract, currently live on the Goerli testnet for Ethereum. An effective landing page attracts users and allows quick access to the minting UI, where they can mint some NFTs to their wallet.

A live demo is available at this [URL](https://baddies-mint-demo-agnar.netlify.app/).

The project was built in React 18, with Vite 4, and libraries like Tailwind CSS, ethers, wagmi, or rainbowkit. Parts of this app were inspired by Pedro at [RainbowKit](https://www.youtube.com/@Rainbowdotme)

### Usage

- Connect your wallet using the rainbowkit tool (top right) to the Goerli testnet and get some test ETH
- Click on the Mint button or scroll down from the landing page to view the minting UI
- Select the number of NFTs that you want to mint in a transaction (25 max)
- Click the mint button, approve transaction and wait for the blockchain to confirm the mint
- Upon success, the image will flip to a cheerful image and links for the blockchain explorer and an NFT marketplace will appear
