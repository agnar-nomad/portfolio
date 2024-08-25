import React from 'react'


interface Props {
  className: string
}
export default function Skeleton({ className }: Props) {
  return (
    <div className={`bg-gray-400 opacity-30 motion-safe:animate-pulse rounded-sm ${className}`} />
  )
}
