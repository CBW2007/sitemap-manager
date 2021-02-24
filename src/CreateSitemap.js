import * as utils from './utils'
import xml from 'xml'
import moment from 'moment'
import path from 'path'

export default async function CreateSitemap (name, pathPrefix, siteURL, data, pathResolver, reporter) {
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
    await utils.writeFile(`./public/sitemap-${name}.xml`, xmlData)
  } catch (error) {
    reporter.panicOnBuild(`Failed to write sitemap-${name}.xml .`)
  }
}
