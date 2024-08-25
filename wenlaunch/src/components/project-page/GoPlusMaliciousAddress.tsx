import GoPlusMessage, { GoPlusHeading, IconOptions } from "./GoPlusMessage";
import { fetchGoPlusMaliciousAddressData } from "@/src/lib/fetchers_goplus"

interface Props {
  contractAddress: string
  chainId?: string
}

export default async function GoPlusMaliciousAddress(props: Props) {

  const { contractAddress, chainId } = props
  const answer = await fetchGoPlusMaliciousAddressData(contractAddress, chainId)

  if (!answer || !["1", "2", 1, 2].includes(answer.code)) {
    return null
  }

  const data = answer.result
  if (!data || !(Object.keys(data).length > 0)) {
    return null
  }

  const issues: string[] = [];

  for (const item in data) {
    if ([1, "1"].includes(data[item]) && item !== "contract_address") {
      issues.push(item)
    }
  }

  if (!issues.length) {
    return null
  }

  const message = 'The provided address seems to be malicious.';
  const icon: IconOptions = 'error';

  let errMsgs = issues.map(item => {
    if (item === "blacklist_doubt") {
      return "Malicious behaviour"
    }
    if (item === "mixer") {
      return "Coin mixer"
    }
    if (item === "reinit") {
      return "Developer can rewrite contract post-release"
    }
    if (item === "fake_standard_interface") {
      return "Fake Standard Protocol - Scam Asset"
    }
    return item
  }).join(" | ");

  let hint = `Source: ${data.data_source ?? "N/A"}. Issues found: ${errMsgs}.`

  return (
    <>
      <GoPlusHeading>GoPlus Malicious Address</GoPlusHeading>
      <GoPlusMessage icon={icon} message={message} hint={hint} />
    </>
  )
}