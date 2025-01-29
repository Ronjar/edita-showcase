<script lang="ts">
    import "../app.css";
    import { app, company } from "$lib/config";
    import { _getHeaderSites, _getFooterSites } from "./api/sites/+server";

    //import { env } from "$env/dynamic/public";

    //import { qr as svgQR } from "@svelte-put/qr/svg";
    import Icon from "@iconify/svelte";

    //export let data;

    //let qrModal: HTMLDialogElement;
    //let url = env.PUBLIC_BASE_URL;

    let headerSites = _getHeaderSites();
    let footerSites = _getFooterSites();

    //function showQR() {
    //    qrModal.showModal();
    //}
</script>

<div class="flex flex-col min-h-screen">
    <header class="navbar bg-base-100 flex justify-between sticky top-0 z-20 shadow-lg">
        <a href="/" class="btn btn-ghost rounded-2xl m-2 text-xl flex items-center">
            {#if app.general.logo_image}
                <img
                    src={app.general.logo_image}
                    alt={app.general.name}
                    class="h-8 w-8 mr-2 rounded-box"
                />
            {:else if app.general.logo_icon}
                <Icon
                    icon={app.general.logo_icon}
                    class="text-accent h-8 w-8"
                />
            {/if}
            <div class="flex items-start">
                <span class="text-2xl">{app.general.name}</span>
                {#if app.general.version}
                    <span class="ml-1 badge badge-neutral">v{app.general.version}</span>
                {/if}
            </div>
        </a>
        <div class="m-2 space-x-2">
            {#await headerSites}
                <p>Loading sites...</p>
            {:then sitesData}
                {#each sitesData as site}
                    <a href={`/sites/${site.slug}`} class="btn btn-ghost text-lg">
                        {site.title}
                    </a>
                {/each}
            {/await}
            <!--{#if url}
                <button class="btn btn-ghost rounded-2xl swap w-12 h-12" on:click={showQR}>
                    <Icon
                        icon="material-symbols:qr-code-2-rounded"
                        class="h-8 w-8"
                    />
                </button>
            {/if}-->
            <label class="btn btn-ghost rounded-2xl swap swap-rotate w-12 h-12">
                <!-- this hidden checkbox controls the state -->
                <input type="checkbox" class="theme-controller" value="light" />
                <Icon
                    icon="material-symbols:light-mode-rounded"
                    class="swap-off fill-current h-8 w-8"
                />
                <Icon
                    icon="material-symbols:dark-mode-rounded"
                    class="swap-on fill-current h-8 w-8"
                />
            </label>
        </div>
    </header>

    <main class="flex-grow">
        <slot />
    </main>

    <div class="w-full bg-base-200 text-base-content">
        <footer class="footer max-w-6xl mx-auto py-8 px-4 flex justify-between">
            <aside>
                {#if company.logo_image}
                    <img
                        src={company.logo_image}
                        alt={company.name}
                        class="h-8 w-8 mr-2 rounded-box"
                    />
                {:else if company.logo_icon}
                    <Icon icon={company.logo_icon} class="h-16 w-16" />
                {/if}
                <p class="text-lg">
                    {company.name}
                </p>
                <p class="opacity-75">
                    {company.slogan}
                </p>
            </aside>
            <div class="flex flex-col md:flex-row gap-20">
                <nav class="flex-none">
                    <h6 class="footer-title">{company.footer.title}</h6>
                    {#each company.footer.menu as item}
                        <a href={item.link} class="link link-hover">
                            {item.title}
                        </a><br />
                    {/each}
                </nav>
                <nav class="flex-none">
                    <h6 class="footer-title">Important links</h6>
                    {#await footerSites}
                        <p>Loading sites...</p>
                    {:then sitesData}
                        {#each sitesData as site}
                            <a
                                href={`/sites/${site.slug}`}
                                class="link link-hover"
                            >
                                {site.title}
                            </a><br />
                        {/each}
                    {/await}
                    <a href="/licenses" class="link link-hover">
                        Licenses
                    </a>
                </nav>
            </div>
        </footer>
    </div>
</div>
<!--
{#if url}
    <dialog
        id="qr_modal"
        class="modal modal-bottom sm:modal-middle"
        bind:this={qrModal}
    >
        <div class="modal-box">
            <h1 class="text-2xl font-bold">Share this website</h1>
            <svg use:svgQR={{ data: url }} />
        </div>

        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
{/if}
-->