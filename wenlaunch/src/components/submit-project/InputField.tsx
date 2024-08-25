import React from 'react'
import { FormSchemaType } from '@/src/models/SubmitFormData'
import { FieldErrors } from 'react-hook-form'
import ErrorMessage from '../common/ErrorMessage'
import PopupHint from '../common/PopupHint'

interface InputProps {
  fieldName: keyof FormSchemaType
  label: string
  placeholder?: string
  type?: string
  className?: string
  children: React.ReactNode | JSX.Element
  errors: FieldErrors<FormSchemaType>
  hint?: string
  required?: boolean
  hint_position?: 'top' | 'right' | 'bottom' | 'left'
}

export default function InputField(
  {
    className = "",
    type = "text",
    label,
    placeholder,
    fieldName,
    children,
    errors,
    hint,
    required,
    hint_position
  }: InputProps) {

  const isError = errors[fieldName]

  return (
    <>
      <label htmlFor={fieldName} className={`label ${className}`}>
        <span className={`label-text flex gap-2 items-center ${isError ? 'text-red-600 font-extrabold' : ''}`}>
          <span>{label}</span>
          {required ? <span className='text-red-500 font-bold'>*</span> : null}
          {hint ? <PopupHint hint_position={hint_position}>{hint}</PopupHint> : null}
        </span>
      </label>
      {children}
      {isError && (
        <ErrorMessage>{errors[fieldName]?.message}</ErrorMessage>
      )}
    </>
  )
}
