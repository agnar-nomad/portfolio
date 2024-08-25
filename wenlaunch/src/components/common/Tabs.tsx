'use client'
import React from 'react'
import { useState } from 'react'

interface Props {
  tabStyle?: "boxed" | "bordered" | "lifted"
  children: JSX.Element[]
  className?: string
  headerClassname?: string
  contentClassname?: string
}

interface ChildrenProps {
  ["data-title"]: string | JSX.Element
}


export default function Tabs(props: Props) {
  const [activeTab, setActiveTab] = useState<number>(0)

  if (!props.children) { return null }

  const { tabStyle, children, className, headerClassname, contentClassname } = props

  return (
    <section className={`max-w-prose h-96 overflow-y-auto relative ${className ?? ''}`}>
      <div className={`tabs-header tabs ${tabStyle === "boxed" ? 'tabs-boxed' : ''} sticky top-0 ${headerClassname ?? ''}`}>
        {children.map((tab, i) => {
          const id = i
          const { ["data-title"]: title } = tab.props as ChildrenProps
          return (
            <span key={i}
              className={`tab ${tabStyle === "bordered" ? "tab-bordered" : ''} ${tabStyle === "lifted" ? "tab-lifted" : ''} ${activeTab === id ? 'tab-active' : ''} flex-grow font-semibold transition-colors duration-500`}
              onClick={() => setActiveTab(id)}>
              {title}
            </span>
          )
        })}
      </div>

      <div className={`tabs-content px-2 py-4 ${contentClassname ?? ''}`}>
        {children.map((child, i) => {
          const id = i
          if (id !== activeTab) return

          return (
            <React.Fragment key={'tab-content-' + i}>
              {child.props.children}
            </React.Fragment>)
        })}
      </div>
    </section>
  )
}
