import { Project } from '@/src/models/ApiModels'
import React from 'react'


interface Props {
  categories: Project['categories']
  className?: string
}
export default function CategoryBadges({ categories, className }: Props) {

  return (
    <span className={`card-actions ${className ?? ''}`}>
      {categories && categories.map((cat) => (
        <span key={cat.id}
          className="badge badge-info badge-outline pointer-events-none">
          {cat.category_name}
        </span>
      ))}
    </span>
  )
}
