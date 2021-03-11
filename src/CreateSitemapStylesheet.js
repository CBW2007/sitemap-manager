import * as utils from './utils'
import path from 'path'

export default function CreateSitemapStylesheet (outFile, pathPrefix, siteUrl) {

  // Replace the `{{blog-url}}` variable with our real site URL
  const sitemapStylesheet = utils.xmlStylesheetTemplate(new URL(path.join(pathPrefix, 'sitemap.xml'), siteUrl).toString())

  // Save the updated stylesheet to the public folder, so it will be
  // available for the xml sitemap files
  try {
    utils.writeFile(outFile, sitemapStylesheet)
  } catch (e) {
    throw new Error(`Failed to write ${outFile}:\n  ${e.message}`)
  }
}
