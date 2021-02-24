import fs from 'fs'
import pify from 'pify'

export const writeFile = pify(fs.writeFile)
export const readFile = pify(fs.readFile)

export const sitemapTemplate = (data) => { return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="sitemap.xsl"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${data}</urlset>` }
export const sitemapIndexTemplate = (data) => { return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="sitemap.xsl"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${data}</sitemapindex>` }
