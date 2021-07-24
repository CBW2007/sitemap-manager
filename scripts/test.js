const { SitemapManager } = require('../dist/main')
const fs = require('fs')

if (fs.existsSync('./public'))
    fs.rmdirSync('./public',{recursive: true})
fs.mkdirSync('./public')

const MySitemap = new SitemapManager({
    siteURL: 'https://example.com/',
    pathPrefix: 'aaa'
})

MySitemap.addUrl('aa',[
    {loc: 'https://example.com/aaa/a/'},
    {loc: 'https://example.com/aaa/中文/'},
    {loc: 'https://example.com/aaa/b/', lastmod: new Date()},
    {loc: 'https://example.com/aaa/c/', lastmod: '2021-07-01T08:00:00'},
])

MySitemap.addUrl('bb',[{loc: 'https://example.com/aaa/ab/'}])
MySitemap.addUrl('bb',[{loc: 'https://example.com/aaa/ac/'}])

MySitemap.finish()
