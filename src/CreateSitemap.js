import * as utils from './utils'
import xml from 'xml'
import moment from 'moment'
import path from 'path'

export default function CreateSitemap (outFile, pathPrefix, siteURL, data, pathResolver) {
  let xmlData = ''
  const lastModified = moment(new Date(), moment.ISO_8601).toISOString()
  data.forEach((node) => {
    xmlData = xmlData + xml({
      url: [
        { loc: new URL(path.join(pathPrefix, pathResolver(node)), siteURL).toString() },
        { lastmod: lastModified },
      ],
    })
  })
  xmlData = utils.sitemapTemplate(xmlData)
  try {
    utils.writeFile(outFile, xmlData)
  } catch (e) {
    throw new Error(`Failed to write ${outFile}:\n  ${e.message}`)
  }
}
