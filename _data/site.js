'use strict'

const eleventyPackage = require('@11ty/eleventy/package.json')

module.exports = function () {
  return {
    behavior: process.env.CONTEXT !== 'production' ? 'Disallow' : 'Allow',
    generator: `${eleventyPackage.name} v${eleventyPackage.version}`,
    robots: process.env.CONTEXT !== 'production' ? 'noindex, nofollow' : 'all',
    url: process.env.URL || 'https://federicogranata.dev',
    // ... more site metadata like title, baseUrl, etc.
  }
}
