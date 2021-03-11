import * as utils from './utils'
import xml from 'xml'
import moment from 'moment'
import path from 'path'

export default function CreateIndexSitemap (outFile, pathPrefix, siteURL, data) {
  let xmlData = ''
  const lastModified = moment(new Date(), moment.ISO_8601).toISOString()
  data.forEach((node) => {
    xmlData = xmlData + xml({
      sitemap: [
        { loc: new URL(path.join(pathPrefix, node), siteURL).toString() },
        { lastmod: lastModified },
      ],
    })
  })
  xmlData = utils.sitemapIndexTemplate(xmlData)
  try {
    utils.writeFile(outFile, xmlData)
  } catch (e) {
    throw new Error(`Failed to write ${outFile}:\n  ${e.message}`)
  }
}
