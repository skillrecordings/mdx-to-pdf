import React from 'react'
import Doc from './example.mdx'
import 'tailwindcss/tailwind.css'
import './pdf-styles.css'
import {MDXProvider} from '@mdx-js/react'
import mdxComponents from './components/mdx'

export default () => (
  <MDXProvider components={mdxComponents}>
    <div className="prose prose-lg">
      <Doc />
    </div>
  </MDXProvider>
)
