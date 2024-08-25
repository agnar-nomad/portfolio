'use client'

import React from 'react'
import '@/src/css/markdown.css'
import MarkdownToJSX from 'markdown-to-jsx';
// import * as MD2JSX from 'markdown-to-jsx'
import { compiler } from 'markdown-to-jsx';
import { renderToString } from 'react-dom/server'


interface Props {
  content?: string;
  className?: string
}

export default function Markdown({ content, className }: Props) {

  if (!content) { return null }

  // type MDOptions = MD2JSX.Options;

  const markdownCompilerOptions = {
    forceWrapper: true,
    wrapper: React.Fragment,
    namedCodesToUnicode: {
      '#39': '\u0027',
      '#x27': '\u0027',
      '&#x27;': '\u0027',
    },
    overrides: {}
  }

  const compiledMarkdown = compiler(content, markdownCompilerOptions)
  const compiledMarkdownToString = renderToString(compiledMarkdown)
  // console.log('line 30: ', compiled, typeof compiled, compiledMarkdownToString, typeof compiledMarkdownToString)

  const sanitisationOptions = {
    // ...sanitizeMarkdown.defaults,
    // allowedTags: [...sanitizeMarkdown.defaults.allowedTags],
    // allowedAttributes: { span: ['id'] }
  }

  // const sanitisedMarkdownString = sanitizeMarkdown(compiledMarkdownToString, sanitisationOptions)

  // console.log('sanitised', sanitisedMarkdownString, typeof sanitisedMarkdownString)


  return (
    <>
      <div className={`markdown prose prose-a:no-underline prose-p:leading-relaxed prose-p:mt-2 prose-p:mb-2 prose-ul:mt-2 prose-ul:mb-2 prose-ol:mt-2 prose-ol:mb-2 ${className}`}>
        <MarkdownToJSX options={markdownCompilerOptions}>
          {compiledMarkdownToString}
        </MarkdownToJSX>
      </div>
    </>
  )
}