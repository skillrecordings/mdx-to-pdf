import App from './App'
import React from 'react'
import express from 'express'
import {renderToString} from 'react-dom/server'
import fs from 'fs'
import Prince from 'prince'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
          .map((asset) => `<link rel="stylesheet" href="${asset}">`)
          .join('')
      : ''
    : ''
}

const jsScriptTagsFromAssets = (assets, entrypoint, extra = '') => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map((asset) => `<script src="${asset}"${extra}></script>`)
          .join('')
      : ''
    : ''
}

export const renderApp = (req, res) => {
  const markup = renderToString(<App />)

  const html =
    // prettier-ignore
    `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${cssLinksFromAssets(assets, 'client')}
      <link rel="stylesheet" href="build.css">
  </head>
  <body>
      <div id="root">${markup}</div>
      ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
  </body>
</html>`

  return {html}
}

const server = express()

const {html: expHtml} = renderApp()

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const {html} = renderApp(req, res)
    res.send(html)
  })

// write build.html that Prince uses to generate PDF
fs.writeFile('build.html', expHtml, function (err) {
  if (err) return console.log(err)
  console.log('build.html saved')
})

Prince()
  .inputs('build.html')
  .output('output.pdf')
  .execute()
  .then(
    function () {
      console.log('OK: done')
    },
    function (error) {
      console.log('ERROR: ', error)
    }
  )

export default server
