import React from 'react'
import Doc from './example.md'
import 'tailwindcss/tailwind.css'
import {MDXProvider} from '@mdx-js/react'
import mdxComponents from './components/mdx'

export default () => (
  <MDXProvider components={mdxComponents}>
    <div className="prose prose-lg">
      <Doc />
    </div>
  </MDXProvider>
)
