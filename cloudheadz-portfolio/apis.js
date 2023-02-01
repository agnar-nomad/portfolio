import AnkrProvider from '@ankr.com/ankr.js';

const provider = new AnkrProvider();

export const getNfts = async (address, blockchain, quantity, filter) => {
  try {
    //if using the filter option, only a single blockchain can be used
    const { assets } = await provider.getNFTsByOwner({
      walletAddress: address,
      // blockchain: ['bsc', 'fantom'],
      blockchain: [blockchain],
      pageSize: quantity,
      filter: filter,
    });
    console.log('line 14 Assets: ', assets);
    return { nfts: assets };
  } catch (err) {
    console.log('line 17: ', err);
    throw new Error(`Error while fetching nfts: `, err.message);
  }
};

export const getNftsForModal = async (wallet, contractAddress, quantity) => {
  try {
    const { assets } = await provider.getNFTsByOwner({
      walletAddress: wallet,
      // blockchain: ['bsc', 'fantom'],
      blockchain: ['avalanche'],
      pageSize: quantity,
      filter: [
        { [contractAddress]: [] },
        // { '0xdce4867e34f977619b296646b04bdb334b8f6950': ['505'] }, // Bananaz
      ],
    });
    console.log('line 34, filtered NFTs: ', assets);
    return { nfts: assets };
  } catch (err) {
    throw new Error(`Error while fetching nfts: `, err.message);
  }
};
