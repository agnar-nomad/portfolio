import { Project } from '@/src/models/ApiModels'
import React from 'react'


interface Props {
  networks: Project['networks']
  className?: string
}
export default function NetworkBadges({ networks, className }: Props) {

  return (
    <span className={`card-actions ${className ?? ''}`}>
      {networks && networks.map((n) => (
        <span key={n.id} className="badge badge-accent badge-outline pointer-events-none">
          {n.network_abbreviation}
        </span>
      ))}
    </span>
  )
}
