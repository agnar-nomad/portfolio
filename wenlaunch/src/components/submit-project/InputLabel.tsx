import React from 'react'
import { FormSchemaType } from '@/src/models/SubmitFormData'

interface LabelProps {
  field: keyof FormSchemaType
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
