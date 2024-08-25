'use client'
import React from 'react'
import Markdown2JSX from 'markdown-to-jsx';
import { MarkdownToJSX } from 'markdown-to-jsx';


interface Props {
  children: string;
  className?: string
}

export default function Markdown({ children, className }: Props) {

  if (!children) { return null }

  type MDOptions = MarkdownToJSX.Options;

  const markdownCompilerOptions: MDOptions = {
    forceWrapper: true,
    wrapper: React.Fragment,
    namedCodesToUnicode: {
      '#39': '\u0027',
      '#x27': '\u0027',
      '&#x27;': '\u0027',
    },
    forceBlock: true,
  }

  return (
    <>
      <div className={`markdown prose prose-a:no-underline prose-p:leading-relaxed prose-p:mt-2 prose-p:mb-2 prose-ul:mt-2 prose-ul:mb-2 prose-ol:mt-2 prose-ol:mb-2 ${className}`}>
        <Markdown2JSX options={markdownCompilerOptions}>
          {children}
        </Markdown2JSX>
      </div>
    </>
  )
}