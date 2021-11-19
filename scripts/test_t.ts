import { SitemapManager, types } from '../dist'

type t = types.Options
const opt: t = { siteURL: 'a' }

const a = new SitemapManager(opt)

console.log(a)
