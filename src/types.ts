import { URL } from 'url'

export interface Options {
  outDir?: string,
  siteURL: string,
  pathPrefix?: string
}

export interface UrlObj {
  loc: string | URL,
  lastmod?: string | Date,
  changefreq?: 'never' | 'yearly' | 'monthly' | 'weekly' | 'daily' | 'hourly' | 'always' | 1 | 2 | 3 | 4 | 5 | 6 | 7,
  priority?: number
}
