import { URL } from 'url'

export type WarningHandler = (msg: string) => void

export type FileHandler = (file: string, data: string) => void

interface HookSet {
  warningHandler?: WarningHandler,
  fileHandler?: FileHandler
}

export interface FullOptions {
  outDir: string,
  siteURL: string,
  pathPrefix: string,
  hooks: {
    warningHandler: WarningHandler,
    fileHandler: FileHandler
  }
}

export interface Options {
  outDir?: string,
  siteURL: string,
  pathPrefix?: string,
  hooks?: HookSet
}

export interface UrlObj {
  loc: string | URL,
  lastmod?: string | Date,
  changefreq?: 'never' | 'yearly' | 'monthly' | 'weekly' | 'daily' | 'hourly' | 'always' | 1 | 2 | 3 | 4 | 5 | 6 | 7,
  priority?: number
}
