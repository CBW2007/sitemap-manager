import { UrlObj } from './types'

const freqMap = ['', 'never', 'yearly', 'monthly', 'weekly', 'daily', 'hourly', 'always']

export function dateConverter (date: Date | string): string {
  return new Date(date).toISOString()
}

export function objToString (url: UrlObj): string {
  let ele: string
  ele = `<loc>${url.loc.toString()}</loc>`
  if (url.lastmod) {
    ele = ele + `<lastmod>${new Date(url.lastmod).toISOString()}</lastmod>`
  }
  if (url.priority && url.priority >= 0 && url.priority <= 1) {
    ele = ele + `<priority>${url.priority}</priority>`
  }
  if (url.changefreq) {
    ele = ele + `<changefreq>${(typeof (url.changefreq) === 'number') ? freqMap[url.changefreq] : url.changefreq}</changefreq>`
  }
  return ele
}
