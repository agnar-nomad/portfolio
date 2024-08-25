// API Collection Types

import { Category, Network } from "./ApiModels"

type NetworkOptionsType = Omit<Network, 'createdAt' | 'updatedAt' | 'publishedAt' | 'id'> & { id: string}

export const networkOptions = {
  "ethereum": {
    slug: "ethereum",
    network_name: "Ethereum",
    id: "1",
    network_abbreviation: "ETH",
    chain_id: "1"
  },
  "avalanche": {
    slug: "avalanche",
    network_name: "Avax",
    id: "2",
    network_abbreviation: "AVAX",
    chain_id: "43114"
  },
  "cardano": {
    slug: "cardano",
    network_name: "Cardano",
    id: "3",
    network_abbreviation: "ADA"
  },
  "polygon": {
    slug: "polygon",
    network_name: "Polygon",
    id: "4",
    network_abbreviation: "MATIC",
    chain_id: "137"
  },
  "solana": {
    slug: "solana",
    network_name: "Solana",
    id: "5",
    network_abbreviation: "SOL",
    chain_id: "solana"
  },
  "aptos": {
    slug: "aptos",
    network_name: "Aptos",
    id: "6",
    network_abbreviation: "APT"
  },
  "binance": {
    slug: "binance",
    network_name: "Binance Smart Chain",
    id: "7",
    network_abbreviation: "BSC",
    chain_id: "56"
  },
  "arbitrum": {
    slug: "arbitrum",
    network_name: "Arbitrum",
    id: "8",
    network_abbreviation: "ARBI",
    chain_id: "42161"
  },
  "bitcoin": {
    slug: "bitcoin",
    network_name: "Bitcoin",
    id: "9",
    network_abbreviation: "BTC"
  },
  "hedera": {
    slug: "hedera",
    network_name: "Hedera",
    id: "11",
    network_abbreviation: "HBAR"
  },
  "sei": {
    slug: "sei",
    network_name: "Sei Network",
    id: "12",
    network_abbreviation: "SEI"
  },
  "base": {
    slug: "base",
    network_name: "Base Network",
    id: "13",
    network_abbreviation: "BASE"
  },
  "blast": {
    slug: "blast",
    network_name: "Blast Network",
    id: "14",
    network_abbreviation: "BLAST"
  },
}

export const networkOptionsArray: NetworkOptionsType[] = Object.values(networkOptions)


type CategoryOptionsType = Omit<Category, 'createdAt' | 'updatedAt' | 'publishedAt' | 'id'> & { id: string}

export const categoryOptions = {
  "nft": { category_name: "NFT", id: "1", slug: "nft" },
  "dex": { category_name: "DEX", id: "2", slug: "dex" },
  "gamefi": { category_name: "GameFi", id: "3", slug: "gamefi" },
  "token": { category_name: "Coin", id: "4", slug: "token" },
  "defi": { category_name: "DeFi", id: "5", slug: "defi" },
  "marketplace": { category_name: "Marketplace", id: "6", slug: "marketplace" },
  "free-mint": { category_name: "Free Mint", id: "7", slug: "free-mint" },
  "play-to-earn": { category_name: "Play2Earn", id: "8", slug: "play-to-earn" },
  "dao": { category_name: "DAO", id: "9", slug: "dao" },
  "ordinals-nft": { category_name: "Ordinals", id: "10", slug: "ordinals-nft" },
  "physical-item": { category_name: "Physical Item", id: "12", slug: "physical-item" },
}


export const categoryOptionsArray: CategoryOptionsType[] = Object.values(categoryOptions)