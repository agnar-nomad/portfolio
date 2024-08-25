import React from 'react'


interface ErrorTextSizes {
  textSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl"
}
// why extending? because maybe I will need ErrorTextSizes somewhere and I will move it to another file so I can export it
interface ErrorMessageProps extends ErrorTextSizes {
  children?: string | JSX.Element
  className?: string
}

export default function ErrorMessage({ children, textSize = "xs", className = "" }: ErrorMessageProps) {
  return (
    <p className={`text-red-600 text-${textSize} mt-1 ${className}`}>{children}</p>
  )
}
