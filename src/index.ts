import fs from 'fs'
import xml from 'xml'
import { URL } from 'url'
import moment from 'moment'
import path from 'path'

const xmlStylesheet = Buffer.from('PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHhzbDpzdHlsZXNoZWV0IHhtbG5zOnhzbD0iaHR0cDovL3d3dy53My5vcmcvMTk5OS9YU0wvVHJhbnNmb3JtIiB4bWxuczpzaXRlbWFwPSJodHRwOi8vd3d3LnNpdGVtYXBzLm9yZy9zY2hlbWFzL3NpdGVtYXAvMC45IiB2ZXJzaW9uPSIxLjAiPjx4c2w6dGVtcGxhdGUgbWF0Y2g9Ii8iPjxodG1sPjxoZWFkPjx0aXRsZT5TaXRlbWFwPC90aXRsZT48bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEsIG1heGltdW0tc2NhbGU9MSwgc2hyaW5rLXRvLWZpdD1ubyIvPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+CgkJIAkJLmEtbm8tdWw6OmJlZm9yZSB7CgkJIAkJCWRpc3BsYXk6IG5vbmU7CgkJIAkJfQoJCQk8L3N0eWxlPjwhLS0gTURVSSBDU1MgLS0+PGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21kdWlAMS4wLjEvZGlzdC9jc3MvbWR1aS5taW4uY3NzIiBpbnRlZ3JpdHk9InNoYTM4NC1jTFJyTXEzOUhPWmR2RTBqNnlCb2pPNCsxUHJIZkI3YTlsNXFMY21SbS9maVdYWVkrQ25kSlBteXU1RlYvOVR3IiBjcm9zc29yaWdpbj0iYW5vbnltb3VzIi8+PC9oZWFkPjxib2R5PjxkaXYgY2xhc3M9Im1kdWktY29udGFpbmVyIG1kdWktdHlwbyI+PGgxIHN0eWxlPSJ0ZXh0LWFsaWduOmNlbnRlciI+U2l0ZW1hcDwvaDE+PGRpdiBjbGFzcz0ibWR1aS1kaXZpZGVyIi8+PHhzbDppZiB0ZXN0PSJjb3VudChzaXRlbWFwOnNpdGVtYXBpbmRleC9zaXRlbWFwOnNpdGVtYXApICZsdDsgMSI+PGEgaHJlZj0ic2l0ZW1hcC54bWwiIGNsYXNzPSJtZHVpLWJ0biBhLW5vLXVsIj48aSBjbGFzcz0ibWR1aS1pY29uIG1hdGVyaWFsLWljb25zIj7ujJs8L2k+YmFjayB0byBpbmRleDwvYT48L3hzbDppZj48dGFibGUgY2xhc3M9Im1kdWktdGFibGUiPjx0aGVhZD48dHI+PHRoIHN0eWxlPSJ3aWR0aDo4MCUiPlVSTDwvdGg+PHRoIHN0eWxlPSJ3aWR0aDoyMCUiPkxhc3QgbW9kaWZpZWQ8L3RoPjwvdHI+PC90aGVhZD48dGJvZHk+PHhzbDpmb3ItZWFjaCBzZWxlY3Q9InNpdGVtYXA6dXJsc2V0L3NpdGVtYXA6dXJsIj48dHI+PHRkPjx4c2w6dmFyaWFibGUgbmFtZT0ibG9jVXJsIj48eHNsOnZhbHVlLW9mIHNlbGVjdD0ic2l0ZW1hcDpsb2MiLz48L3hzbDp2YXJpYWJsZT48YSBocmVmPSJ7JGxvY1VybH0iPjx4c2w6dmFsdWUtb2Ygc2VsZWN0PSJzaXRlbWFwOmxvYyIvPjwvYT48L3RkPjx0ZD48eHNsOnZhbHVlLW9mIHNlbGVjdD0ic2l0ZW1hcDpsYXN0bW9kIi8+PC90ZD48L3RyPjwveHNsOmZvci1lYWNoPjx4c2w6Zm9yLWVhY2ggc2VsZWN0PSJzaXRlbWFwOnNpdGVtYXBpbmRleC9zaXRlbWFwOnNpdGVtYXAiPjx0cj48dGQ+PHhzbDp2YXJpYWJsZSBuYW1lPSJsb2NVcmwiPjx4c2w6dmFsdWUtb2Ygc2VsZWN0PSJzaXRlbWFwOmxvYyIvPjwveHNsOnZhcmlhYmxlPjxhIGhyZWY9InskbG9jVXJsfSI+PHhzbDp2YWx1ZS1vZiBzZWxlY3Q9InNpdGVtYXA6bG9jIi8+PC9hPjwvdGQ+PHRkPjx4c2w6dmFsdWUtb2Ygc2VsZWN0PSJzaXRlbWFwOmxhc3Rtb2QiLz48L3RkPjwvdHI+PC94c2w6Zm9yLWVhY2g+PC90Ym9keT48L3RhYmxlPjwvZGl2PjwhLS0gTURVSSBKYXZhU2NyaXB0IC0tPjxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21kdWlAMS4wLjEvZGlzdC9qcy9tZHVpLm1pbi5qcyIgaW50ZWdyaXR5PSJzaGEzODQtZ0NNWmNzaFlLT0dSWDlyNndiRHJ2RitUY0NDc3dTSEZ1Y1V6VVB3a2ErR3IrdUhnamxZdmtBQnI5NVRDT3ozQSIgY3Jvc3NvcmlnaW49ImFub255bW91cyIvPjwvYm9keT48L2h0bWw+PC94c2w6dGVtcGxhdGU+PC94c2w6c3R5bGVzaGVldD4K', 'base64').toString()
const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>'
// src: src/sitemap.xsl

interface Option {
  outDir?: string,
  siteURL: string,
  pathPrefix?: string
}
interface Url {
  loc: string,
  lastmod?: string | Date
}

function DateConverter (date: Date | string): string {
  return moment(date).toISOString()
}

class SitemapManager {
  options: Option
  #urlDatas: Map<string, Array<Url>> = new Map()
  isFinished: Boolean = false

  constructor (options: Option) {
    this.options = options
  }

  addUrl (name: string, url: Array<Url>): void {
    if (this.isFinished) { throw new Error('[SitemapManager]Error: Lifecycle finished') }
    this.#urlDatas.set(name, [...(this.#urlDatas.get(name) || []), ...url])
  }

  finish (): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isFinished) { reject(new Error('[SitemapManager]Error: Lifecycle finished')) }
      let xmlContents:Array<any> = []
      this.#urlDatas.forEach((v, k) => {
        xmlContents.push({
          sitemap: [
            { loc: new URL(path.join(this.options.pathPrefix || '', `sitemap-${k}.xml`), this.options.siteURL).toString() },
            { lastmod: DateConverter(new Date()) }
          ]
        })
      })
      //      console.log(JSON.stringify(xmlContents))
      try {
        fs.writeFileSync(path.resolve(this.options?.outDir || './public', 'sitemap.xml'),
          xmlDeclaration + xml({ sitemapindex: [{ _attr: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' } }, ...xmlContents] }))
      } catch (e) {
        reject(new Error(`[SitemapManager]: Failed to write file sitemap.xml: ${e.message}`))
      }
      this.#urlDatas.forEach((value, key) => {
        xmlContents = []
        value.forEach((node) => {
          const ele:Array<any> = [{ loc: node.loc }]
          if (node.lastmod) ele.push({ lastmod: DateConverter(node.lastmod) })
          xmlContents.push({
            url: ele
          })
        })
        //        console.log(JSON.stringify(xmlContents))
        try {
          fs.writeFileSync(path.resolve(this.options?.outDir || './public', `sitemap-${key}.xml`),
            xmlDeclaration + xml({ urlset: [{ _attr: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' } }, ...xmlContents] }))
        } catch (e) {
          reject(new Error(`[SitemapManager]: Failed to write file sitemap-${key}.xml: ${e.message}`))
        }
      })
      try {
        fs.writeFileSync(path.resolve(this.options?.outDir || './public', 'sitemap.xsl'), xmlStylesheet)
      } catch (e) {
        reject(new Error(`[SitemapManager]: Failed to write file sitemap.xsl: ${e.message}`))
      }

      resolve()
    })
  }
}

export { SitemapManager }
