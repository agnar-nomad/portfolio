import { Project } from "@/src/models/ApiModels"
import { networkOptions } from "@/src/models/Collections"
import Image from "next/image"
import GoPlusNFT from "./GoPlusNFT"
import GoPlusdApp from "./GoPlusdApp"
import GoPlusApprovalSecurity from "./GoPlusApproval"
import GoPlusMaliciousAddress from "./GoPlusMaliciousAddress"
import GoPlusToken from "./GoPlusToken"
import GoPlusFooterBanner from '@/src/images/logos/GoPlus_footer.svg'
import { TOKEN_CATEGORY_ID, NFT_CATEGORY_ID } from "@/src/lib/form_submission_helpers"

const DEFI_CATEGORY_ID = "5"
const MARKETPLACE_CATEGORY_ID = "6"

interface GoPlusProps {
  networks: Project["networks"]
  categories: Project["categories"]
  contractAddress: string
  websiteUrl?: string
}

type NetworkSlugs = keyof typeof networkOptions


export default async function GoPlusSecurity(props: GoPlusProps) {

  const { networks, contractAddress, websiteUrl, categories } = props

  if (!networks || networks.length > 1 || networks.length === 0) {
    return (<p> Sorry, we could not retrieve data. </p>)
  }

  const chain = networks[0].slug as NetworkSlugs
  let chainId: string | null = null

  if (networkOptions[chain]) {
    const network = networkOptions[chain];
    if ('chain_id' in network) {
      chainId = network.chain_id
    }
  }

  if (!chainId) {
    return (<p> Not a supported blockchain. </p>)
  }

  const categoryIDs = categories.map(cat => cat.id.toString())
  const isDAPP = categoryIDs.includes(DEFI_CATEGORY_ID) || categoryIDs.includes(MARKETPLACE_CATEGORY_ID);
  const isNFT = categoryIDs.includes(NFT_CATEGORY_ID);
  const isToken = categoryIDs.includes(TOKEN_CATEGORY_ID)

  return (
    <div>
      <div className="border-2 p-2 border-accent text-sm font-medium italic">
        We rely on GoPlus Security for detection of problematic contracts or contract creators. The data shown here is not definitive and is not guaranteed to be error-free and 100% complete. This is also not financial advice. Make sure to check multiple sources and use your own judgement.
      </div>

      {chainId !== "solana" &&
        <GoPlusApprovalSecurity chainId={chainId} contractAddress={contractAddress} />
      }

      <GoPlusMaliciousAddress chainId={chainId} contractAddress={contractAddress} />

      {isNFT &&
        <GoPlusNFT chainId={chainId} contractAddress={contractAddress} />
      }

      {isToken &&
        <GoPlusToken chainId={chainId} contractAddress={contractAddress} />
      }

      {websiteUrl && isDAPP ?
        <GoPlusdApp dAppUrl={websiteUrl} />
        : null
      }

      <div>
        <Image src={GoPlusFooterBanner} alt="GoPlus Security powered by banner." />
      </div>

    </div>
  )
}