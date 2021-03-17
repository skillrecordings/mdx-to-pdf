'use strict'

const emoji = require('remark-emoji')

module.exports = {
  plugins: [
    {
      name: 'mdx',
      options: {
        mdPlugins: [emoji],
      },
    },
  ],
  // modifyWebpackOptions(opts) {
  //   const options = opts.options.webpackOptions
  //   options.postCssOptions.plugins.unshift(require('@tailwindcss/jit'))
  //   // options.postCssOptions.plugins.unshift(require('tailwindcss'))
  //   return options
  // },
}
