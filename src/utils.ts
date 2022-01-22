import { UrlObj, WarningHandler, FileHandler } from './types'
import * as fs from 'fs'

const freqMap = ['', 'never', 'yearly', 'monthly', 'weekly', 'daily', 'hourly', 'always']

const defaultWarningHandler: WarningHandler = (msg) => {
  throw new Error(msg)
}

const defaultFileHandler: FileHandler = fs.writeFileSync

export const defaultHookSet = {
  defaultWarningHandler,
  defaultFileHandler
}

export function dateConverter (date: Date | string): string {
  return new Date(date).toISOString()
}

export function objToString (url: UrlObj, warningHandler: WarningHandler): string {
  let ele: string
  ele = `<loc>${url.loc.toString()}</loc>`
  if (url.lastmod) {
    ele = ele + `<lastmod>${new Date(url.lastmod).toISOString()}</lastmod>`
  }
  if (url.priority) {
    if (!(url.priority >= 0 && url.priority <= 1)) {
      warningHandler(`The priority of ${url.loc}(${url.priority}) is invalid. Expected value ranges from 0 to 1.`)
    }
    ele = ele + `<priority>${url.priority}</priority>`
  }
  if (url.changefreq) {
    if (!((typeof (url.changefreq) === 'number' && url.changefreq >= 1 && url.changefreq <= 7) ||
      (typeof (url.changefreq) === 'string' && freqMap.indexOf(url.changefreq) > 0))) {
      warningHandler(`The changefreq of ${url.loc}(${url.changefreq}) is invalid. Expected a string or a number ranges from 1 to 7. See https://github.com/CBW2007/sitemap-manager/wiki/Types#urlobj`)
    }
    ele = ele + `<changefreq>${(typeof (url.changefreq) === 'number') ? freqMap[url.changefreq] : url.changefreq}</changefreq>`
  }
  return ele
}
