import * as utils from './utils'
import path from 'path'

export default async function CreateSitemapStylesheet (siteUrl, pathPrefix) {

  // Replace the `{{blog-url}}` variable with our real site URL
  const sitemapStylesheet = utils.xmlStylesheetTemplate(new URL(path.join(pathPrefix, 'sitemap.xml'), siteUrl).toString())

  // Save the updated stylesheet to the public folder, so it will be
  // available for the xml sitemap files
  await utils.writeFile(path.join('./public', 'sitemap.xsl'), sitemapStylesheet)
}
