import React from 'react'
import { AlphaCallSubmissionType } from '@/src/models/SubmitAlphaCallFormData'

interface LabelProps {
  field: keyof AlphaCallSubmissionType
  label: string
}

export default function InputLabel({ field, label }: LabelProps) {

  return (
    <>
      <label htmlFor={field} className="label">
        <span className="label-text">{label}</span>
      </label>
    </>
  )
}
