import React from 'react'
import type { StatusModifierColors } from '@/src/models/typings'


interface ToastProps {
  type?: StatusModifierColors
  children: string | JSX.Element
  className?: string
}

export default function Toast({ children, type = "info", className }: ToastProps) {

  let toastColorClasses
  switch (type) {
    case 'info':
      toastColorClasses = 'alert alert-info'
      break
    case 'warning':
      toastColorClasses = 'alert alert-warning'
      break
    case 'success':
      toastColorClasses = 'alert alert-success'
      break
    case 'error':
      toastColorClasses = 'alert alert-error'
      break
  }

  return (
    <div className={`toast z-20 ${className ?? ''}`}>
      <div className={toastColorClasses}>
        {children}
      </div>
    </div>
  )
}
