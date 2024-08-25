import Script from "next/script";

export default function UmamiAnalyticsScript() {
  return (
    <Script
      src="https://umami-production-4561.up.railway.app/script.js"
      data-website-id="4a737c38-5805-4d9a-a3bb-c80a22132978"
      strategy="afterInteractive"
    />
  )
}