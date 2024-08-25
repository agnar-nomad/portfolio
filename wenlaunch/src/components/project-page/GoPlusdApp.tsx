import { BiCheckSquare } from "react-icons/bi";
import GoPlusMessage, { GoPlusHeading, IconOptions } from "./GoPlusMessage";
import { fetchGoPlusDAPPData } from "@/src/lib/fetchers_goplus"
import { formatReleaseDate } from "@/src/lib/helpers";
import Link from "next/link";

interface Props {
  dAppUrl: string
}

export default async function GoPlusdApp({ dAppUrl }: Props) {

  const answer = await fetchGoPlusDAPPData(dAppUrl)

  if (!answer || !["1", "2", 1, 2].includes(answer.code)) {
    return null
  }

  const data = answer.result
  if (!data || !(Object.keys(data).length > 0)) {
    return null
  }

  return (
    <>
      <GoPlusHeading>GoPlus dApp Security</GoPlusHeading>
      <IsAudit value={data.is_audit} />
      <AuditInfo value={data.audit_info} />
      <TrustList value={data.trust_list} />
      <ContractsSecurity value={data.contracts_security} />
    </>
  )
}


const IsAudit = ({ value }: { value: 0 | 1 }) => {

  if (![0, 1].includes(value)) {
    return null
  }

  let message, icon: IconOptions;
  let hint = "Describes whether the dApp has been audited by a reputable audit firm."
  switch (value) {
    case 0:
      icon = "success";
      message = "This dApp has been audited."
      break;
    case 1:
      icon = "maybe";
      message = "There is no audit data on this dApp yet."
      break;
  }
  return (
    <GoPlusMessage icon={icon} message={message} hint={hint} />
  )
}

const AuditInfo = ({ value }: { value: any[] | null }) => {

  if (!value || value.length === 0) {
    return null
  }
  const auditData = value[0]
  const date = formatReleaseDate(auditData.audit_time)

  return (
    <div className="flex items-center gap-2">
      <BiCheckSquare className="w-6 h-6 text-success" />
      <span>
        The latest audit was completed on {date.date} by {auditData.audit_firm ?? "N/A"}.
        <Link href={auditData.audit_link} target="_blank" referrerPolicy="no-referrer">Link</Link>
      </span>
    </div>
  )
}

const TrustList = ({ value }: { value: 0 | 1 }) => {

  if (value !== 1) {
    return null
  }

  const message = "This dApp is a famous and trustworthy one.";
  const icon: IconOptions = "success";

  return (
    <GoPlusMessage icon={icon} message={message} />
  )
}

const ContractsSecurity = ({ value }: { value: any[] | null }) => {

  const secData = value?.[0]?.contracts
  if (!value || value.length === 0 || !secData || secData.length === 0) {
    return null
  }

  const contractsOpenSource = secData.every((item: { is_open_source?: number; }) => item.is_open_source === 1) ?? false;

  const contractsMalicious = secData.some((item: { malicious_contract?: number; }) => item.malicious_contract === 1) ?? false;

  const creatorMalicious = secData.some((item: { malicious_creator?: number; }) => item.malicious_creator === 1) ?? false;

  return (
    <>
      {contractsOpenSource ?
        <GoPlusMessage message="All audited contracts are open-sourced" icon="success" />
        : null
      }
      {
        contractsMalicious ?
          <GoPlusMessage message="Some of the audited contracts seem to be malicious" icon="error" />
          : null
      }
      {
        creatorMalicious ?
          <GoPlusMessage message="Some of the audited contracts seem to be created by a malicious creator" icon="error" />
          : null
      }
    </>
  )
}