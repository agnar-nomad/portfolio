import React from 'react'
import { BsQuestionSquare } from 'react-icons/bs'
import type { DaisyModifierColors } from '@/src/models/typings'

interface PopupHintProps {
  logoSize?: number
  children: React.ReactNode
  color?: DaisyModifierColors
  hint_position?: 'top' | 'right' | 'bottom' | 'left'
}
export default function PopupHint(props: PopupHintProps) {

  const { children, color, logoSize = 16, hint_position } = props

  return (
    <div className={`tooltip ${hint_position ? 'tooltip-' + hint_position : ''} ${color ? 'tooltip-' + color : ''} grid place-items-center`} data-tip={children}>
      <button className="btn btn-xs btn-ghost border-0 p-0 m-0 no-animation pointer-events-none cursor-help">
        <BsQuestionSquare size={logoSize} />
      </button>
    </div>
  )
}
