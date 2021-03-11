const { CreateSitemap, CreateIndexSitemap, CreateSitemapStylesheet } = require('../dist/index')
const { mkDir, rmDir, exists } = require('../dist/utils')
const path = require('path')

const data=JSON.parse(`
{
    "data": {
        "site": {
            "siteMetadata": {
                "siteUrl": "https://example.com"
            }
        },
        "postsQuery": {
            "edges": [{
                "node": {
                    "id": "00a79c3f-0ec9-504e-9b32-28a1f7e0b77a",
                    "fields": {
                        "slug": "/test/"
                    }
                }
            }, {
                "node": {
                    "id": "ef47f21b-2e7e-58ae-9f70-43b408188969",
                    "fields": {
                        "slug": "/blog/one/"
                    }
                }
            }, {
                "node": {
                    "id": "a8327a61-e913-5d9b-a21a-48c68fe0628e",
                    "fields": {
                        "slug": "/blog/two/"
                    }
                }
            }, {
                "node": {
                    "id": "779744c7-13e6-599b-9d4b-deba11f0ecd3",
                    "fields": {
                        "slug": "/empty/"
                    }
                }
            }, {
                "node": {
                    "id": "2ee42eea-58de-5a56-846c-985f79be3c9b",
                    "fields": {
                        "slug": "/"
                    }
                }
            }, {
                "node": {
                    "id": "8e823adf-5de6-5a6f-81e3-559faddda74b",
                    "fields": {
                        "slug": "/math/"
                    }
                }
            }, {
                "node": {
                    "id": "2b123280-0275-54d5-8c5c-7ae5b061fba5",
                    "fields": {
                        "slug": "/math/poly/div-mod/"
                    }
                }
            }, {
                "node": {
                    "id": "d923ddcc-0e6c-5cc7-88cd-66cf38aefa79",
                    "fields": {
                        "slug": "/math/poly/intro/"
                    }
                }
            }, {
                "node": {
                    "id": "d95c2b31-f6bd-52bc-8078-8b7f5c5c9912",
                    "fields": {
                        "slug": "/math/poly/fft/"
                    }
                }
            }, {
                "node": {
                    "id": "e50d721e-5570-50dc-8089-dde25e0727dc",
                    "fields": {
                        "slug": "/math/poly/fwt/"
                    }
                }
            }, {
                "node": {
                    "id": "9bc90933-d44f-57fe-b36d-1c6ee5d5477e",
                    "fields": {
                        "slug": "/math/poly/inv-tri-func/"
                    }
                }
            }, {
                "node": {
                    "id": "c4bb4bf7-5b67-525c-b03b-1e653f08df1a",
                    "fields": {
                        "slug": "/math/poly/inv/"
                    }
                }
            }, {
                "node": {
                    "id": "d02a27a1-7a5d-5722-805b-349185305c8c",
                    "fields": {
                        "slug": "/math/poly/lagrange/"
                    }
                }
            }, {
                "node": {
                    "id": "492c557d-6279-51e9-9e4d-300114300382",
                    "fields": {
                        "slug": "/math/poly/multipoint-eval-interpolation/"
                    }
                }
            }, {
                "node": {
                    "id": "8e9b4fe1-6ad9-5917-a948-1cc9c875b523",
                    "fields": {
                        "slug": "/math/poly/ln-exp/"
                    }
                }
            }, {
                "node": {
                    "id": "23778dce-fb19-5569-ada1-28247a506162",
                    "fields": {
                        "slug": "/math/poly/newton/"
                    }
                }
            }, {
                "node": {
                    "id": "f71fe369-5225-50bc-8c04-28a882844abb",
                    "fields": {
                        "slug": "/math/poly/ntt/"
                    }
                }
            }, {
                "node": {
                    "id": "e032c60c-ab98-5a7c-9686-ffbf89018d2a",
                    "fields": {
                        "slug": "/math/poly/sqrt/"
                    }
                }
            }, {
                "node": {
                    "id": "a9ba831f-b536-5cb9-a7de-1b04b3e82dcf",
                    "fields": {
                        "slug": "/math/poly/tri-func/"
                    }
                }
            }]
        },
        "tagsQuery": {
            "group": [{
                "fieldValue": "Chicago"
            }, {
                "fieldValue": "Chinese"
            }, {
                "fieldValue": "TEST"
            }, {
                "fieldValue": "WIP"
            }, {
                "fieldValue": "animals"
            }, {
                "fieldValue": "math"
            }, {
                "fieldValue": "polynomial"
            }, {
                "fieldValue": "zoos"
            }, {
                "fieldValue": "中文"
            }]
        }
    }
}`).data

const siteURL = data.site.siteMetadata.siteUrl
const pathPrefix = '/aaa/'

if (exists('public'))
{
  console.log("delete files from previous test")
  rmDir('public', {
    recursive: true
  })
}
console.log('create public folder')
mkDir('public')

console.log('create sitemaps')
CreateSitemap(
  path.resolve('./public/sitemap-articles.xml'),
  pathPrefix,
  siteURL,
  data.postsQuery.edges,
  (data) => { return data.node.fields.slug },
)
CreateSitemap(
  path.resolve('./public/sitemap-logs.xml'),
  pathPrefix,
  siteURL,
  data.postsQuery.edges,
  (data) => { return data.node.fields.slug + 'changelog/' },
)
CreateSitemap(
  path.resolve('./public/sitemap-tags.xml'),
  pathPrefix,
  siteURL,
  data.tagsQuery.group,
  (data) => { return `/tags/${data.fieldValue}/` },
)
CreateSitemap(
  path.resolve('./public/sitemap-pages.xml'),
  pathPrefix,
  siteURL,
  ['/pages/', '/settings/'],
  (data) => { return data },
)
CreateIndexSitemap(
  path.resolve('./public/sitemap.xml'),
  pathPrefix,
  siteURL,
  ['sitemap-pages.xml', 'sitemap-articles.xml', 'sitemap-logs.xml', 'sitemap-tags.xml'],
)
CreateSitemapStylesheet(
  path.resolve('./public/sitemap.xsl'),
  pathPrefix,
  siteURL,
)
