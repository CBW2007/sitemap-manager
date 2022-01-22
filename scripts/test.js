const { SitemapManager } = require('../dist/index')
const fs = require('fs')

if (fs.existsSync('./public')) { fs.rmSync('./public', { recursive: true }) }
fs.mkdirSync('./public')

const MySitemap = new SitemapManager({
  siteURL: 'https://example.com/',
  pathPrefix: 'aaa',
  hooks: {
    // warningHandler: (msg) => { console.log('#' + msg) },
    /* fileHandler: (file, data) => {
      console.log(`===${file}===`)
      console.log(data)
    } */
  }
})

MySitemap.addUrl('dates', [
  { loc: 'https://example.com/aaa/a/a/' },
  { loc: 'https://example.com/aaa/a/b/', lastmod: new Date() },
  { loc: 'https://example.com/aaa/a/c/', lastmod: '2021-07-01T08:00:00' }
])

MySitemap.addUrl('freq', [
  { loc: 'https://example.com/aaa/b/a', changefreq: 4 },
  { loc: 'https://example.com/aaa/b/b', changefreq: 7 }/*,
  { loc: 'https://example.com/aaa/b/c', changefreq: 'daily' },
  { loc: 'https://example.com/aaa/b/d', changefreq: 114514 }, // wrong case,
  { loc: 'https://example.com/aaa/b/e', changefreq: 'what' } // wrong case */
])

MySitemap.addUrl('pro', [
  { loc: 'https://example.com/aaa/c/a', priority: 0.3 },
  { loc: 'https://example.com/aaa/c/b', priority: 0.5 }/*,
  { loc: 'https://example.com/aaa/c/c', priority: 2 }, // wrong case
  { loc: 'https://example.com/aaa/c/d', priority: -1 } // wrong case */
])

MySitemap.addUrl('mix', {
  loc: 'https://example.com/aaa/d/a'
})
MySitemap.addUrl('mix', {
  loc: 'https://example.com/aaa/d/b',
  changefreq: 3,
  lastmod: new Date()
})
MySitemap.addUrl('mix', {
  loc: 'https://example.com/aaa/d/c',
  priority: 0.1,
  lastmod: new Date('1949-10-01T08:00:00')
})
MySitemap.addUrl('mix', {
  loc: 'https://example.com/aaa/d/d',
  changefreq: 'always',
  lastmod: '2007-03-13T08:00:00',
  priority: 0.9
})
/* MySitemap.addUrl('mix', { // repeat case
  loc: 'https://example.com/aaa/d/d',
  changefreq: 'always',
  lastmod: '2007-03-13T08:00:00',
  priority: 0.9
}) */

MySitemap.finish()
