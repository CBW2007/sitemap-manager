import * as utils from './utils'
import xml from 'xml'
import moment from 'moment'
import path from 'path'

export default async function CreateIndexSitemap (pathPrefix:string, siteURL:string, data: any, reporter:any): Promise<void> {
  let xmlData = ''
  const lastModified = moment(new Date(), moment.ISO_8601).toISOString()
  data.forEach((node) => {
    xmlData = xmlData + xml({
      url: [
        { loc: new URL(path.join(pathPrefix, node), siteURL).toString() },
        { lastmod: lastModified },
      ],
    })
  })
  xmlData = utils.sitemapIndexTemplate(xmlData)
  try {
    await utils.writeFile('./public/sitemap.xml', xmlData)
  } catch (error) {
    reporter.panicOnBuild('Failed to write sitemap.xml .')
  }
}
