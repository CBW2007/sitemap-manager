import * as utils from './utils'
import path from 'path'

export default async function CreateSitemapStylesheet (outFile, pathPrefix, siteUrl) {

  // Replace the `{{blog-url}}` variable with our real site URL
  const sitemapStylesheet = utils.xmlStylesheetTemplate(new URL(path.join(pathPrefix, 'sitemap.xml'), siteUrl).toString())

  // Save the updated stylesheet to the public folder, so it will be
  // available for the xml sitemap files
  await utils.writeFile(outFile, sitemapStylesheet)
}
