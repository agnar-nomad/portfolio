export type ErrorTextSizeTest =  {
  textSize: "xs" | "sm" | "base" | "lg" | "xl" | "2xl"
}

export type StatusModifierColors = "info" | "success" | "warning" | "error"
export type DaisyModifierColors = "primary" | "secondary" | "accent" | StatusModifierColors

export type ParamsType = {
  params: {
    slug: string;
  }
}

// ErrorPageProps comes from Next.js
export type ErrorPageProps = {
  error: Error & { digest?: string },
  reset: () => void
}