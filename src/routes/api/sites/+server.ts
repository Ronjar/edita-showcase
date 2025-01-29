import type { Site } from '$lib/types'

async function getSites() {
	let sites: Site[] = []

	const paths = import.meta.glob('../../../site/sites/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Site, 'slug'>
			const site = { ...metadata, slug } satisfies Site
			site.published && sites.push(site)
		}
	}

	sites = sites.sort((first, second) =>
		new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return sites
}

export async function _getHeaderSites() {
	return getSites().then(sites => {
		return sites.filter(site => site.header == true)
	})
}
export async function _getFooterSites() {
	return getSites().then(sites => {
		return sites.filter(site => site.footer == true)
	})
}
export async function _getMainSites() {
	return getSites().then(async sites => {
		return sites.filter(s => s.main == true);
	})
}