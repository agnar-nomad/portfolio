import GoPlusMessage, { GoPlusHeading, IconOptions } from "./GoPlusMessage";
import { fetchGoPlusNftData } from "@/src/lib/fetchers_goplus"


interface Props {
  chainId: string
  contractAddress: string
}

export default async function GoPlusNFT(props: Props) {

  const { chainId, contractAddress } = props
  const answer = await fetchGoPlusNftData(contractAddress, chainId)

  if (!answer || !["1", "2", 1, 2].includes(answer.code)) {
    return (<p><em> Sorry, there was an error loading NFT data. Try reloading the page in a few seconds.</em> </p>)
  }

  const data = answer.result
  if (!data || !(Object.keys(data).length > 0)) {
    return null
  }

  return (
    <>
      <GoPlusHeading>GoPlus NFT Security</GoPlusHeading>
      <OpenSourceNft value={data.nft_open_source} />
      <MaliciousNft value={data.malicious_nft_contract} />
      <NftProxy value={data.nft_proxy} />
      <SelfDestruct value={data.self_destruct.value} />
      <TransferWithoutApproval value={data.transfer_without_approval.value} />
      <PrivilegedMint value={data.privileged_minting.value} />
      <PrivilegedBurn value={data.privileged_burn.value} />
    </>
  )
}


const OpenSourceNft = ({ value }: { value: 0 | 1 }) => {

  if (![0, 1].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "Un-open-sourced contracts may hide various unknown mechanisms and are extremely risky.";
  switch (value) {
    case 1:
      icon = "success";
      message = "NFT contract is open-source."
      break;
    case 0:
      icon = "error";
      message = "NFT contract is not open-source."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const MaliciousNft = ({ value }: { value: 0 | 1 }) => {

  if (![0, 1].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "Malicious behaviors include random additions, blacklist abuse, falsified transactions, and other high-risk behaviours.";
  switch (value) {
    case 0:
      icon = "success";
      message = "NFT contract is not a malicious contract."
      break;
    case 1:
      icon = "error";
      message = "NFT contract is recognised as a malicious contract."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const NftProxy = ({ value }: { value: 0 | 1 | null }) => {

  if (![0, 1, null].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "Most Proxy contracts are accompanied by modifiable implementation contracts, which may pose significant potential risk.";
  switch (value) {
    case 0:
      icon = "success";
      message = "NFT contract is not a proxy contract."
      break;
    case 1:
      icon = "error";
      message = "NFT contract is a proxy contract."
      break;
    case null:
      icon = "maybe";
      message = "NFT contract may be a proxy contract. Cannot be determined."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const SelfDestruct = ({ value }: { value: 0 | 1 }) => {

  if (![0, 1].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "When the self-destruct function is triggered, this contract will be destroyed, all functions will be unavailable, and all related assets will be erased.";
  switch (value) {
    case 0:
      icon = "success";
      message = "NFT contract can not self-destruct."
      break;
    case 1:
      icon = "error";
      message = "NFT contract could self-destruct."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const TransferWithoutApproval = ({ value }: { value: 0 | 1 | 2 }) => {

  if (![0, 1, 2].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "This risk generally means the scammer does not need to get approvals to transfer another address's NFT.";
  switch (value) {
    case 0:
      icon = "success";
      message = "Contract owner can not transfer NFT without approval"
      break;
    case 1:
      icon = "error";
      message = "Contract owner can transfer NFT without approval"
      break;
    case 2:
      icon = "maybe";
      message = "Contract can transfer NFT without approval. Risk is not significant."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const PrivilegedMint = ({ value }: { value: 0 | 1 | 2 }) => {

  if (![0, 1, 2].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "Some minting methods can only be triggered by an address with special privileges. Generally speaking, these are usually for the owner to mint.";
  switch (value) {
    case 0:
      icon = "success";
      message = "Contract owner can not mint NFT outside of regular means"
      break;
    case 1:
      icon = "maybe";
      message = "Contract owner can mint NFT outside of regular means"
      break;
    case 2:
      icon = "maybe";
      message = "Contract can mint NFT outside of regular means. Risk is not significant."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const PrivilegedBurn = ({ value }: { value: 0 | 1 | 2 }) => {

  if (![0, 1, 2].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "Describes whether the NFT owner can burn others' NFTs directly through the contract and without permission";
  switch (value) {
    case 0:
      icon = "success";
      message = "Contract owner can not burn holder NFT"
      break;
    case 1:
      icon = "error";
      message = "Contract owner can potentially burn holder NFT"
      break;
    case 2:
      icon = "maybe";
      message = "Contract can burn holder NFT. Risk is not significant."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}