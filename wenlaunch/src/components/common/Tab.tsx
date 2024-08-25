import React from 'react'

interface Props {
  title: string | JSX.Element
  children: string | JSX.Element
}
export default function Tab({ title, children }: Props): JSX.Element {
  return (
    <div key={'tab_' + title} data-title={title}>
      {children}
    </div>
  )
}
