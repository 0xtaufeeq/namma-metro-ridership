<script lang="ts">
	import '../app.css';
	import '$lib/styles/markdown.css';
	import SEO from '$lib/components/SEO.svelte';
	import { metadata } from '$lib/SEO.md';

	let { children } = $props();
</script>

<SEO seoData={metadata} />
<main class="main">
	<div class="content markdown">
		{@render children?.()}
	</div>
</main>

<style>
	.main {
		min-height: 100vh;
		background: var(--color-background);

		margin: 0 auto;
	}

	.content {
		margin: 0 auto;
		max-width: 72ch;
		padding: 4rem 1.5rem;
	}

	@media (min-width: 768px) {
		.content {
			padding: 6rem 2rem;
		}
	}

	@media (max-width: 768px) {
		.main {
			padding: 0;
		}
	}

</style>
