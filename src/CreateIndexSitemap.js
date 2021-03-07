import * as utils from './utils'
import xml from 'xml'
import moment from 'moment'
import path from 'path'

export default async function CreateIndexSitemap (outFile, pathPrefix, siteURL, data, reporter) {
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
    await utils.writeFile(outFile, xmlData)
  } catch (error) {
    reporter.panicOnBuild('Failed to write sitemap file.')
  }
}
