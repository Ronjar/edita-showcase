<script lang="ts">
	let { data } = $props()
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:article:modified_time" content={new Date(data.meta.date).toISOString()} />
</svelte:head>

<div class="p-6 mt-20 max-w-4xl mx-auto bg-base-200 rounded-xl shadow-md space-y-4">
<!--
	<div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div>
-->
	<div class="prose ">
		<data.content />
	</div>

</div>