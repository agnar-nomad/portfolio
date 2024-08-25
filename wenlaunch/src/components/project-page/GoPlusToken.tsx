import { formatPercentage, formatTokenSupply } from "@/src/lib/helpers";
import GoPlusMessage, { GoPlusHeading, IconOptions } from "./GoPlusMessage";
import { fetchGoPlusTokenData } from "@/src/lib/fetchers_goplus"


interface Props {
  chainId: string
  contractAddress: string
}

export default async function GoPlusToken(props: Props) {

  const { chainId, contractAddress } = props
  const address = contractAddress.toLowerCase()

  const answer = await fetchGoPlusTokenData(address, chainId)

  if (!answer || !["1", "2", 1, 2].includes(answer.code)) {
    return (<p><em> Sorry, there was an error loading token security data. Try reloading the page in a few seconds.</em> </p>)
  }

  const data = answer.result[address]
  if (!data || !(Object.keys(data).length > 0)) {
    return null
  }

  return (
    <>
      <GoPlusHeading>GoPlus Token Security</GoPlusHeading>

      <OpenSource value={data.is_open_source} />
      <TokenIsProxy value={data.is_proxy} />
      <Honeypot value={data.is_honeypot} />
      <HoneypotSameCreator value={data.honeypot_with_same_creator} />
      <TokenIsMintable value={data.is_mintable} />
      <TakeBackOwnership value={data.can_take_back_ownership} />
      <OwnerCanChangeBalance value={data.owner_change_balance} />
      <HiddenOwner value={data.hidden_owner} />
      <SelfDestruct value={data.selfdestruct} />
      <GasAbuse value={data.gas_abuse} />
      <IsInDex value={data.is_in_dex} />
      <BuyTax value={data.buy_tax} />
      <SellTax value={data.sell_tax} />
      <CannotSellAll value={data.cannot_sell_all} />
      <ModifiableTax value={data.slippage_modifiable} />
      <PausableTransfer value={data.transfer_pausable} />
      <AntiWhale value={data.is_anti_whale} />
      <AirdropScam value={data.is_airdrop_scam} />
      <OtherPotentialRisk value={data.other_potential_risks} />

      <GoPlusHeading>Info from GoPlus</GoPlusHeading>

      <TokenHolderNumber value={data.holder_count} />
      <TotalSupply value={data.total_supply} />
      <OwnerBalance value={data.owner_balance} />
      <OwnerBalancePercent value={data.owner_percent} />
      <CreatorBalance value={data.creator_balance} />
      <CreatorBalancePercent value={data.creator_percent} />
    </>
  )
}


const OpenSource = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value === undefined) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "Un-open-sourced contracts may hide various unknown mechanisms and are extremely risky.";
  switch (value) {
    case "1":
      icon = "success";
      message = "Token contract is open-source."
      break;
    case "0":
      icon = "error";
      message = "Token contract is not open-source."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const TokenIsProxy = ({ value }: { value: "0" | "1" | null | undefined }) => {

  if (value === undefined || !["0", "1", null].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "Most Proxy contracts are accompanied by modifiable implementation contracts, which may pose significant potential risk.";
  switch (value) {
    case "0":
      icon = "success";
      message = "Token contract is not a proxy contract."
      break;
    case "1":
      icon = "error";
      message = "Token contract is a proxy contract."
      break;
    case null:
      icon = "maybe";
      message = "Token contract may be a proxy contract. Cannot be determined."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const TokenIsMintable = ({ value }: { value: "0" | "1" }) => {

  if (value !== "1") {
    return null
  }

  const message = "The contract has the ability to mint additional tokens.";
  const icon: IconOptions = "error";
  let hint = "Mint functions can trigger a massive sell-off, causing the coin price to plummet.";
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const TakeBackOwnership = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value !== "1") {
    return null
  }

  const message = "Ownership can be reclaimed again after renouncing.";
  const icon: IconOptions = "error";
  return (
    <GoPlusMessage icon={icon} message={message} />
  )
}

const OwnerCanChangeBalance = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value !== "1") {
    return null
  }

  const message = "Owner can change holder balance.";
  const icon: IconOptions = "error";
  const hint = "This feature allows the owner to modify anyone's balance, resulting in a holder's asset to be changed, or a massive minting and sell-off."
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const HiddenOwner = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value !== "1") {
    return null
  }

  const message = "The contract has hidden owner(s).";
  const icon: IconOptions = "error";
  const hint = "Hidden ownership is used by developers to maintain ownership ability even after abandoning ownership, and is often an indicator of malicious intent."
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const SelfDestruct = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value === undefined || !["0", "1"].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "When the self-destruct function is triggered, this contract will be destroyed, all functions will be unavailable, and all related assets will be erased.";
  switch (value) {
    case "0":
      icon = "success";
      message = "Token contract can not self-destruct."
      break;
    case "1":
      icon = "error";
      message = "Token contract could self-destruct."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const GasAbuse = ({ value }: { value: "0" | "1" | undefined | null }) => {

  if (value !== "1") {
    return null
  }

  const message = "The contract is using user's gas fee to mint other assets.";
  const icon: IconOptions = "error";
  const hint = "Any interaction with such addresses may result in loss of property."
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const IsInDex = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value === undefined) {
    return null
  }

  let message = "";
  let icon: IconOptions = "error";
  switch (value) {
    case "0":
      icon = "error";
      message = "Token can not be traded on a DEX."
      break;
    case "1":
      icon = "success";
      message = "Token can be traded on a DEX."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} />
  )
}

const BuyTax = ({ value }: { value: string | "" | undefined }) => {

  if (value === undefined) {
    return null
  }

  let message = "buy tax";
  let icon: IconOptions = "error";
  let hint;

  if (value === "") {
    return (
      <GoPlusMessage icon={"maybe"} message={"Buy tax is unknown."} hint={hint} />
    )
  }

  const valueNum = parseFloat(value)
  if (valueNum > 0.05) {
    icon = "error";
    message = "Buy tax is higher than 5%."
    hint = "The tax amount is " + valueNum * 100 + " %."
    if (valueNum === 1 || valueNum === 1.0) {
      hint = "Tax value is 100%. This might be an error in our data or it is indeed a scam. Try to reload in a few minutes."
    }
  }
  if (valueNum <= 0.05) {
    icon = "success";
    message = "Buy tax is max 5%.";
    hint = "The tax amount is " + valueNum * 100 + " %."
  }

  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const SellTax = ({ value }: { value: string | "" | undefined }) => {

  if (value === undefined) {
    return null
  }

  let message = "sell tax";
  let icon: IconOptions = "error";
  let hint;

  if (value === "") {
    return (
      <GoPlusMessage icon={"maybe"} message={"Sell tax is unknown."} hint={hint} />
    )
  }

  const valueNum = parseFloat(value)
  if (valueNum > 0.05) {
    icon = "error";
    message = "Sell tax is higher than 5%."
    hint = "The tax amount is " + valueNum * 100 + " %."
    if (valueNum === 1 || valueNum === 1.0) {
      hint = "Tax value is 100%. This might be an error in our data or it is indeed a scam. Try to reload in a few minutes."
    }
  }
  if (valueNum <= 0.05) {
    icon = "success";
    message = "Sell tax is max 5%.";
    hint = "The tax amount is " + valueNum * 100 + " %."
  }

  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const CannotSellAll = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value !== "1") {
    return null
  }

  const message = "The contract restricts holders from selling all the tokens at once.";
  const icon: IconOptions = "error";
  const hint = "This feature means that you will not be able to sell all your tokens in a single sale. Sometimes you need to leave a certain percentage of the token or a fixed number of tokens."
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const ModifiableTax = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value !== "1") {
    return null
  }

  const message = "Trading tax can be modifiable by token contract.";
  const icon: IconOptions = "error";
  const hint = "The contract owner can modify the buy tax or sell tax of the token. This may cause losses, especially since some contracts have unlimited modifiable tax rates."
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const Honeypot = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value === undefined) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "HoneyPot means that the token cannot be sold because of the token contract's function, or the token contains malicious code. High risk, definitely scam.";
  switch (value) {
    case "0":
      icon = "success";
      message = "Token is not a Honeypot."
      break;
    case "1":
      icon = "error";
      message = "Token is found to be a HONEYPOT. Stay away!"
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const HoneypotSameCreator = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value !== "1") {
    return null
  }

  const message = "The owner is a honeypot creator!";
  const icon: IconOptions = "error";
  const hint = "The creator of this contract has released Honeypot contracts in the past. Stay away!"
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const PausableTransfer = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value !== "1") {
    return null
  }

  const message = "Trading can be paused by token contract.";
  const icon: IconOptions = "error";
  const hint = "The contract owner will be able to suspend trading at any time, after which noone will not be able to sell (except maybe some with special authority)."
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const AntiWhale = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value === undefined) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "It describes whether the contract has the function to limit the maximum amount of transactions or the maximum token position for a single address.";
  switch (value) {
    case "1":
      icon = "success";
      message = "Token has anti-whale protection."
      break;
    case "0":
      icon = "maybe";
      message = "Token does not have anti-whale protection."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const AirdropScam = ({ value }: { value: "0" | "1" | undefined }) => {

  if (value !== "1") {
    return null
  }

  const message = "The token is an airdrop scam. Do not trade.";
  const icon: IconOptions = "error";
  return (
    <GoPlusMessage icon={icon} message={message} />
  )
}

const OtherPotentialRisk = ({ value }: { value: string | null | undefined }) => {

  if (!value) {
    return null
  }

  const message = "The token contract has other potential risks.";
  const icon: IconOptions = "error";
  const hint = value
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

// info
const TokenHolderNumber = ({ value }: { value: number | undefined }) => {

  if (value && value > 0) {
    return (
      <div>Token holders: {value}</div>
    )
  }
  return null
}

const TotalSupply = ({ value }: { value: number | undefined }) => {

  if (value && value > 0) {
    return (
      <div>Total token supply: {formatTokenSupply(value)}</div>
    )
  }
  return null
}

const OwnerBalance = ({ value }: { value: number | undefined }) => {
  if (!value) {
    return null
  }

  return (
    <div>Contract owner balance: {formatTokenSupply(value)}</div>
  )
}

const OwnerBalancePercent = ({ value }: { value: number | undefined }) => {
  if (!value) {
    return null
  }

  return (
    <div>Percentage of tokens held by contract owner: {formatPercentage(value)}</div>
  )
}

const CreatorBalance = ({ value }: { value: number | undefined }) => {
  if (!value) {
    return null
  }

  return (
    <div>Contract creator balance: {formatTokenSupply(value)}</div>
  )
}

const CreatorBalancePercent = ({ value }: { value: number | undefined }) => {
  if (!value) {
    return null
  }

  return (
    <div>Percentage of tokens held by contract creator: {formatPercentage(value)}</div>
  )
}