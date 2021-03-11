# sitemap-manager
An easy way to create sitemaps!

## Features
Quick, Fast, And Beautiful!

## Usage
First run

```shell
$ npm i sitemap-manager --save
or
$ yarn add sitemap-manager
```

Then just try it:

```js
const { CreateSitemap, CreateIndexSitemap, CreateSitemapStylesheet } = require('sitemap-manager')
const data = {/* data here */} //see more in scripts/test.js
const siteURL = data.site.siteMetadata.siteUrl
const pathPrefix = '/aaa/'

// Create Sitemaps for each kind of pages.
CreateSitemap(
  path.resolve('./public/sitemap-articles.xml'), // The path of the file which will be generated.
  pathPrefix, // Prefix of the path. If your site doesn't at the root of the domain,just try this.
              // Example:
              //   given path: /foo/
              //   handled path: /aaa/foo/
  siteURL, // The domain of your site.
  data.postsQuery.edges, // Your data, shoud be an array
  (data) => { return data.node.fields.slug }, // How to turn the data to a path
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
// Create an index for all sitemaps.
CreateIndexSitemap(
  path.resolve('./public/sitemap.xml'), // The path of the file which will be generated.
  pathPrefix, // Prefix of the path. If your site doesn't at the root of the domain,just try this.
  siteURL, // The domain of your site.
  ['sitemap-pages.xml', 'sitemap-articles.xml', 'sitemap-logs.xml', 'sitemap-tags.xml'], // All the sitemaps should be here.
)
// Create the xml template file.
// !IMPORTANT
// Should be at the same dir as any other sitemaps.
// E.g.
// |
// \
//  aaa
//  | sitemap.xml
//  | sitemap.xsl
//  | sitemap-artcles.xml
//  | sitemap-logs.xml
//    ...
CreateSitemapStylesheet(
  path.resolve('./public/sitemap.xsl'), // The path of the file which will be generated.
  pathPrefix, // Prefix of the path. If your site doesn't at the root of the domain,just try this.
  siteURL, // The domain of your site.
)
```

## LICENSE
MIT