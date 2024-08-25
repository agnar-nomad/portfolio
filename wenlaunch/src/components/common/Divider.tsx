import React from 'react'

interface Props {
  className?: string
}

export default function Divider({ className }: Props) {
  return (
    <div className={`divider mt-0 before:bg-secondary after:bg-secondary ${className ?? ''}`} />

  )
}
