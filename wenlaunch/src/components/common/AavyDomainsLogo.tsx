import React from 'react'

interface Props {
  width?: number
  height?: number
  fill?: string
  color?: string
  size: number
  className?: string
  stroke?: string
}
const AavyDomainsLogo = ({ width, height, color, fill, size, className, stroke }: Props) => {
  return (
    <>
      <svg width={`${size || width}`} height={`${size || height}`} viewBox="0 0 104 105" fill={fill || "currentColor"} color={color || ''} className={className} xmlns="http://www.w3.org/2000/svg" role="img" stroke={stroke || "currentColor"}>
        <path d="M21.7324 54.1444L3.68426 71.7523C-9.96181 35.6561 16.0097 0 53.4267 0C89.3468 0 113.293 38.7374 100.528 70.4317L84.2405 53.7042L91.7239 45.7806L86.4415 40.9384L78.9582 48.862L53.4267 22.8903L26.5746 49.3022L19.0912 40.9384L13.8088 45.7806L21.7324 54.1444Z" />
        <path d="M53.4267 33.0149L31.4166 54.5846L38.0195 62.068L52.1059 47.5414L66.6324 62.068L74.1158 54.1444L53.4267 33.0149Z" />
        <path d="M52.1059 57.2258L42.8617 66.9101L52.1059 77.4749L62.2304 66.9101L52.1059 57.2258Z" />
        <path d="M78.9582 58.9866L55.6275 84.0779V104.327C76.757 104.327 92.3107 86.1321 97.4463 77.0347L78.9582 58.9866Z" />
        <path d="M26.5743 59.4268L7.20557 78.7955C18.4746 98.8685 39.4868 104.18 48.5842 104.327V84.0779L26.5743 59.4268Z" />
      </svg>

    </>
  )
}

export default AavyDomainsLogo