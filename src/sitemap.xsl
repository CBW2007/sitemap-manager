<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

<xsl:template match="/">
	<html>
		<head>
			<title>Sitemap</title>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
			<style type="text/css">
		 		.a-no-ul::before {
		 			display: none;
		 		}
			</style>
			<!-- MDUI CSS -->
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/css/mdui.min.css"
				integrity="sha384-cLRrMq39HOZdvE0j6yBojO4+1PrHfB7a9l5qLcmRm/fiWXYY+CndJPmyu5FV/9Tw"
				crossorigin="anonymous"
			/>
		</head>
		<body>
			<div class="mdui-container mdui-typo">
				<h1 style="text-align:center">Sitemap</h1>
				<div class="mdui-divider"></div>
				<xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
					<a href="sitemap.xml" class="mdui-btn a-no-ul"><i class="mdui-icon material-icons">&#xe31b;</i>back to index</a>
				</xsl:if>
				<table class="mdui-table">
					<thead>
						<tr>
							<th style="width:80%">URL</th>
							<th style="width:20%">Last modified</th>
						</tr>
					</thead>
					<tbody>
						<xsl:for-each select="sitemap:urlset/sitemap:url">
							<tr>
								<td>
									<xsl:variable name='locUrl'>
										<xsl:value-of select="sitemap:loc" />
									</xsl:variable>
									<a href="{$locUrl}"><xsl:value-of select="sitemap:loc" /></a>
								</td>
								<td>
									<xsl:value-of select="sitemap:lastmod" />
								</td>
							</tr>
						</xsl:for-each>
						<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
							<tr>
								<td>
									<xsl:variable name='locUrl'>
										<xsl:value-of select="sitemap:loc" />
									</xsl:variable>
									<a href="{$locUrl}"><xsl:value-of select="sitemap:loc" /></a>
								</td>
								<td>
									<xsl:value-of select="sitemap:lastmod" />
								</td>
							</tr>
						</xsl:for-each>
					</tbody>
				</table>
			</div>
			<!-- MDUI JavaScript -->
			<script
				src="https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/js/mdui.min.js"
				integrity="sha384-gCMZcshYKOGRX9r6wbDrvF+TcCCswSHFucUzUPwka+Gr+uHgjlYvkABr95TCOz3A"
				crossorigin="anonymous"
			></script>
		</body>
	</html>
</xsl:template>
</xsl:stylesheet>
