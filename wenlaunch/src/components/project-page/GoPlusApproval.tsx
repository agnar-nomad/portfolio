import GoPlusMessage, { GoPlusHeading, IconOptions } from "./GoPlusMessage";
import { fetchGoPlusApprovalData } from "@/src/lib/fetchers_goplus"


interface Props {
  chainId: string
  contractAddress: string
}

export default async function GoPlusApprovalSecurity(props: Props) {

  const { chainId, contractAddress } = props
  const answer = await fetchGoPlusApprovalData(contractAddress, chainId)

  if (!answer || !["1", "2", 1, 2].includes(answer.code)) {
    return (<p><em> Sorry, there was an error loading data. Try reloading the page in a few seconds.</em> </p>)
  }

  const data = answer.result
  if (!data || !(Object.keys(data).length > 0)) {
    return null
  }

  return (
    <>
      <GoPlusHeading>GoPlus Approval Security</GoPlusHeading>
      <IsContract value={data.is_contract} />
      <OpenSourceContract value={data.is_open_source} />
      <TrustList value={data.trust_list} />
      <MaliciousContract value={data.doubt_list} />
      <MaliciousBehaviour value={data.malicious_behavior} />
      <ContractScan value={data.contract_scan} />
      <RiskyApproval value={data.risky_approval} />
    </>
  )
}


const OpenSourceContract = ({ value }: { value: 0 | 1 }) => {

  if (![0, 1].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "Un-open-sourced contracts may hide various unknown mechanisms and are extremely risky.";
  switch (value) {
    case 1:
      icon = "success";
      message = "Contract is open-source."
      break;
    case 0:
      icon = "error";
      message = "Contract is not open-source."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const IsContract = ({ value }: { value: 0 | 1 }) => {

  if (![0, 1].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  switch (value) {
    case 1:
      icon = "success";
      message = "The provided address is a contract."
      break;
    case 0:
      icon = "error";
      message = "The provided address is not a contract."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} />
  )
}

const TrustList = ({ value }: { value: 0 | 1 }) => {

  if (value !== 1) {
    return null
  }

  const message = "The provided address belongs to a famous and trustworthy contract.";
  const icon: IconOptions = "success";

  return (
    <GoPlusMessage icon={icon} message={message} />
  )
}

const MaliciousContract = ({ value }: { value: 0 | 1 }) => {

  if (![0, 1].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  switch (value) {
    case 0:
      icon = "success";
      message = "No malicious behaviour of this address has been found."
      break;
    case 1:
      icon = "error";
      message = "This is a suspected malicious contract address."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} />
  )
}

const MaliciousBehaviour = ({ value }: { value?: string[] }) => {

  if (!value || value.length === 0) {
    return null
  }

  const message = "There is some malicious activity associated with this address."
  const icon: IconOptions = "error"
  const hint = "Issues detected: " + value.join(", ") + "."

  return (
    <GoPlusMessage message={message} icon={icon} hint={hint} />
  )

}

type RiskyApprovalType = {
  risk?: string,
  value?: 0 | 1
}
const RiskyApproval = ({ value }: { value: RiskyApprovalType }) => {

  if (!value || !value.value || value.value !== 1) {
    return null
  }

  let message = "There is explicit risk associated with approving this contract.";
  const icon: IconOptions = "error";
  let hint = value.risk ? value.risk : undefined;

  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

type ContractScanType = {
  value: {
    privilege_withdraw?: 0 | 1 | null | undefined;
    withdraw_missing?: 0 | 1 | null | undefined;
    blacklist?: 0 | 1 | null | undefined;
    selfdestruct?: 0 | 1 | null | undefined;
    approval_abuse?: 0 | 1 | null | undefined;
  }
}
const ContractScan = ({ value }: ContractScanType) => {

  if (!value || Object.keys(value).length === 0) {
    return null
  }

  const icon: IconOptions = "error";

  const isPrivilegeWithdraw = value?.privilege_withdraw === 1;
  const isWithdrawMissing = value?.withdraw_missing === 1;
  const isBlacklist = value?.blacklist === 1;
  const isSelfdestruct = value?.selfdestruct === 1;
  const isApprovalAbuse = value?.approval_abuse === 1;

  return (
    <>
      {isPrivilegeWithdraw &&
        <GoPlusMessage icon={"maybe"} message={"Owner can withdraw all assets in the contract."} hint="Owner can withdraw all the assets in the contract, without users' permission. Usually not an issue with NFT contracts, as this tends to be minting revenue." />
      }
      {isWithdrawMissing &&
        <GoPlusMessage icon={icon} message="No withdrawal method present on the contract." hint="Users will be unable to withdraw assets allocated in the contract." />
      }
      {isBlacklist &&
        <GoPlusMessage icon={icon} message="The contract has a blacklist function(s)." hint="Blacklisting would block users from withdrawing their assets." />
      }
      {isSelfdestruct &&
        <GoPlusMessage icon={icon} message="This contract can self destruct." />
      }
      {isApprovalAbuse &&
        <GoPlusMessage icon={icon} message="Owner can spend the allowance obtained by the contract." hint="This function could potentially be abused to steal user assets." />
      }
    </>
  )
}