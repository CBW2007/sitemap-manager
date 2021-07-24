import fs from 'fs'
import _ from 'lodash'
import xml from 'xml'
import { URL } from 'url'
import moment from 'moment'
import path from 'path'

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
  _urlDatas: Map<string, Array<Url>> = new Map
  isFinished: Boolean = false

  constructor(options: Option) {
    this.options=options
  }

  addUrl(name: string, url: Array<Url>): void {
    if (this.isFinished)
      throw new Error('[SitemapManager]Error: Lifecycle finished')
    this._urlDatas.set(name, [...(this._urlDatas.get(name)||[]),...url])
  }

  finish(): Promise<void> {
    return new Promise((resolve, reject)=>{
      if (this.isFinished)
        reject('[SitemapManager]Error: Lifecycle finished')
      var xmlContents:Array<any> = []
      this._urlDatas.forEach((v,k)=>{
        xmlContents.push({
          sitemap: [
            { loc: new URL(path.join(this.options.pathPrefix||'',`sitemap-${k}.xml`),this.options.siteURL).toString() },
            { lastmod: DateConverter(new Date()) }
          ]
        })
      })
//      console.log(JSON.stringify(xmlContents))
      try {
        fs.writeFileSync(path.resolve(this.options?.outDir||'./public','sitemap.xml'),
          xml({sitemapindex: [{_attr:{xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'}}, ...xmlContents]}, {declaration: {encoding: 'UTF-8'}}))
      } catch (e) {
        reject(`[SitemapManager]: Failed to write file sitemap.xml: ${e.message}`)
      }
      this._urlDatas.forEach((value,key)=>{
        xmlContents=[]
        value.forEach((node) => {
          var ele:Array<any> = [{loc: node.loc}]
          node.lastmod ? ele.push({lastmod: DateConverter(node.lastmod)}) : undefined
          xmlContents.push({
            url: ele
          })
        })
//        console.log(JSON.stringify(xmlContents))
        try {
          fs.writeFileSync(path.resolve(this.options?.outDir||'./public',`sitemap-${key}.xml`),
          xml({urlindex: [{_attr:{xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'}}, ...xmlContents]}, {declaration: {encoding: 'UTF-8'}}))
        } catch (e) {
          reject(`[SitemapManager]: Failed to write file sitemap-${key}.xml: ${e.message}`)
        }
      })
      resolve()
    })
  }
}

export { SitemapManager }