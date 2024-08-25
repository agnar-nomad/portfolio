'use client'

import { useState } from "react"
import { useCopyToClipboard } from "usehooks-ts"
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

interface CopyToClipboardProps {
  text: string
  label?: string
  className?: string
}

type CopyStatusType = "success" | "error" | "idle"

export default function CopyToClipboard({ text, className, label }: CopyToClipboardProps) {
  const [copiedText, copy] = useCopyToClipboard();
  const [copyStatus, setCopyStatus] = useState<CopyStatusType>("idle");

  const handleCopy = () => {
    setCopyStatus("idle");
    copy(text)
      .then(() => {
        console.log('Copied!', { text })
        setCopyStatus("success")
      })
      .catch(error => {
        console.error('Failed to copy!', error)
        setCopyStatus("error")
      })
      .finally(() => {
        setTimeout(() => {
          setCopyStatus("idle");
        }, 2500);
      })
  }

  let displayText = "Copy"
  let bgColor = ""

  if (copyStatus === "success") {
    displayText = "Copied to clipboard"
    bgColor = "bg-success text-white"
  } else if (copyStatus === "error") {
    displayText = "Copy failed"
    bgColor = "bg-error text-white"
  } else if (copyStatus === "idle") {
    displayText = label || "Copy"
  }

  return (
    <>
      <span className={`${className ?? ''} ${bgColor}`} onClick={handleCopy}>
        <span className="flex items-center gap-2">
          <HiOutlineClipboardDocumentList className="h-6 w-6" />
          {displayText}
        </span>
      </span>
    </>
  )
}