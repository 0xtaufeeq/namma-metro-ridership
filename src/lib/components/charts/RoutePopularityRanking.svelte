<script>
	import VirtualList from 'svelte-tiny-virtual-list';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { ArrowRight, RefreshCcw } from 'lucide-svelte';
	import { tick } from 'svelte';

	import MetroMap from '$charts/InteractiveMetroMap.svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte.ts';

	import stationCodesData from '$lib/data/charts/station-codes.json';
	import routeData from '$lib/data/charts/04-commute-flow.json';

	let selections = $state({ from: '', to: '' });
	let hoveredRoute = $state(null);
	let tooltipPosition = $state({ y: 0 });

	let fromPopoverOpen = $state(false);
	let toPopoverOpen = $state(false);
	let fromTriggerRef = $state(null);
	let toTriggerRef = $state(null);

	const isMobile = new IsMobile();

	const stationInfoMap = new Map(
		stationCodesData.map((s) => {
			const info = {
				name: s.Station,
				line: s.line,
				isInterchange: s.code === 'KGWA' || s.code === 'RVR'
			};
			if (info.isInterchange) {
				info.color = 'var(--color-neutral-800)';
				info.textColor = 'white';
			} else {
				info.color = `var(--color-brand-${s.line})`;
				info.textColor = s.line === 'yellow' ? 'var(--color-neutral-800)' : 'white';
			}
			return [s.code, info];
		})
	);

	const stationOptions = stationCodesData
		.map((s) => ({ value: s.code, label: s.Station }))
		.sort((a, b) => a.label.localeCompare(b.label));

	const routes = $derived(
		routeData
			.filter((route) => route.r != null)
			.map((route, index) => ({
				...route,
				fromName: stationInfoMap.get(route.f)?.name ?? route.f,
				toName: stationInfoMap.get(route.t)?.name ?? route.t,
				rank: index + 1
			}))
	);

	const maxCommuters = $derived(Math.max(...routes.map((r) => r.r)));
	const fromSelectedLabel = $derived(stationInfoMap.get(selections.from)?.name);
	const toSelectedLabel = $derived(stationInfoMap.get(selections.to)?.name);
	const selectedRoute = $derived(
		routes.find((r) => r.f === selections.from && r.t === selections.to) || null
	);

	function handleItemClick(item) {
		selections.from = item.f;
		selections.to = item.t;
	}
	function handleMouseEnter(event, item) {
		const rect = event.currentTarget.getBoundingClientRect();
		const containerRect = event.currentTarget.closest('.list-container').getBoundingClientRect();
		tooltipPosition.y = rect.top - containerRect.top;
		hoveredRoute = item;
	}
	function handleMouseLeave() {
		hoveredRoute = null;
	}
	function resetSelections() {
		selections.from = '';
		selections.to = '';
	}

	function closeAndFocus(popover, triggerRef) {
		if (popover === 'from') fromPopoverOpen = false;
		if (popover === 'to') toPopoverOpen = false;
		tick().then(() => {
			triggerRef?.focus();
		});
	}
</script>

<div class="my-8 mb-8 space-y-6 rounded-2xl border border-border/60 bg-gradient-to-br from-background to-muted/20 p-6 shadow-sm md:p-8">
	<div class="space-y-2">
		<h2 class="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
			How popular is your usual commute?
		</h2>
		<p class="text-base leading-relaxed text-muted-foreground md:text-lg">
			Select a pair of stations to see how many people usually travel that route on a given day
		</p>
	</div>
	
	<div
		class="sticky top-4 z-10 mb-4 grid grid-cols-1 gap-3 rounded-lg border border-border/50 bg-background/95 p-4 backdrop-blur-sm shadow-sm md:static md:grid-cols-[auto_1fr_auto_1fr_auto] md:items-center md:gap-4 md:bg-muted/30 md:p-5 md:backdrop-blur-none"
	>
		<span class="text-sm font-medium text-muted-foreground md:whitespace-nowrap">From</span>
		<Popover.Root bind:open={fromPopoverOpen}>
			<Popover.Trigger bind:ref={fromTriggerRef}>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="outline"
						class="h-10 w-full justify-between border-2 transition-all hover:border-primary/50 hover:bg-accent md:h-11"
						role="combobox"
						aria-expanded={fromPopoverOpen}
						aria-label="Select origin station"
					>
						<span class="truncate font-medium">
							{fromSelectedLabel || 'Select station...'}
						</span>
						<ChevronsUpDownIcon class="ml-2 h-4 w-4 flex-shrink-0 opacity-50 transition-transform {fromPopoverOpen ? 'rotate-180' : ''}" />
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-[var(--radix-popover-trigger-width)] p-0" align="start">
				<Command.Root>
					<Command.Input placeholder="Search station..." class="h-10" />
					<Command.List class="max-h-[300px]">
						<Command.Empty>No station found.</Command.Empty>
						<Command.Group>
							{#each stationOptions as station (station.value)}
								<Command.Item
									value={station.label}
									onSelect={() => {
										selections.from = station.value;
										closeAndFocus('from', fromTriggerRef);
									}}
									class="cursor-pointer"
								>
									<CheckIcon
										class={cn(
											'h-4 w-4',
											selections.from !== station.value && 'text-transparent'
										)}
									/>
									<span class="font-medium">{station.label}</span>
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>

		<ArrowRight class="hidden h-5 w-5 text-muted-foreground md:block" />

		<span class="text-sm font-medium text-muted-foreground md:whitespace-nowrap">To</span>
		<div class="flex items-center gap-2 md:contents">
			<Popover.Root bind:open={toPopoverOpen}>
				<Popover.Trigger bind:ref={toTriggerRef}>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="outline"
							class="h-10 flex-1 justify-between border-2 transition-all hover:border-primary/50 hover:bg-accent md:h-11 md:w-full"
							role="combobox"
							aria-expanded={toPopoverOpen}
							aria-label="Select destination station"
						>
							<span class="truncate font-medium">
								{toSelectedLabel || 'Select station...'}
							</span>
							<ChevronsUpDownIcon class="ml-2 h-4 w-4 flex-shrink-0 opacity-50 transition-transform {toPopoverOpen ? 'rotate-180' : ''}" />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-[var(--radix-popover-trigger-width)] p-0" align="start">
					<Command.Root>
						<Command.Input placeholder="Search station..." class="h-10" />
						<Command.List class="max-h-[300px]">
							<Command.Empty>No station found.</Command.Empty>
							<Command.Group>
								{#each stationOptions as station (station.value)}
									<Command.Item
										value={station.label}
										onSelect={() => {
											selections.to = station.value;
											closeAndFocus('to', toTriggerRef);
										}}
										class="cursor-pointer"
									>
										<CheckIcon
											class={cn(
												'h-4 w-4',
												selections.to !== station.value && 'text-transparent'
											)}
										/>
										<span class="font-medium">{station.label}</span>
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>

			<Button
				variant="outline"
				size="icon"
				onclick={resetSelections}
				class="h-10 w-10 flex-shrink-0 md:hidden"
				aria-label="Reset selection"
			>
				<RefreshCcw class="h-4 w-4" />
			</Button>
		</div>

		<Button
			variant="outline"
			size="icon"
			onclick={resetSelections}
			class="hidden h-11 w-11 items-center justify-center transition-all hover:bg-accent md:flex"
			aria-label="Reset selection"
		>
			<RefreshCcw class="h-4 w-4" />
		</Button>
	</div>

	<div class="breakout-md grid grid-cols-1 gap-6 md:grid-cols-[2fr_3fr]">
		<div
			class="list-container relative order-2 min-w-0 rounded-lg border border-border/50 bg-muted/20 p-3 md:order-1"
			class:h-[250px]={isMobile.current}
			class:h-[650px]={!isMobile.current}
		>
			<div class="mb-2 flex items-center justify-between px-1">
				<h3 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
					All Routes
				</h3>
				<span class="text-xs text-muted-foreground">{routes.length} routes</span>
			</div>
			<VirtualList
				height={isMobile.current ? 200 : 600}
				width="100%"
				itemCount={routes.length}
				itemSize={26}
			>
				<div slot="item" let:index let:style {style}>
					{#if index >= 0}
						{@const item = routes[index]}
						{@const fromInfo = stationInfoMap.get(item.f)}
						{@const toInfo = stationInfoMap.get(item.t)}
						{@const isSelected = selectedRoute &&
							item.f === selectedRoute.f &&
							item.t === selectedRoute.t}
						<div
							class="group grid h-[24px] cursor-pointer grid-cols-[3fr_60px_60px] items-center gap-2 overflow-hidden rounded-md px-2 py-1 text-xs leading-none transition-all duration-200 select-none md:grid-cols-[4fr_50px_90px] md:gap-1 {isSelected ? 'bg-primary/10 border border-primary/30 shadow-sm' : 'hover:bg-muted'}"
							onclick={() => handleItemClick(item)}
							onmouseenter={(e) => !isMobile.current && handleMouseEnter(e, item)}
							onmouseleave={() => !isMobile.current && handleMouseLeave()}
							onkeydown={(e) => e.key === 'Enter' && handleItemClick(item)}
							role="button"
							tabindex="0"
							aria-label="Route from {item.fromName} to {item.toName}, rank #{item.rank}"
						>
							<div class="grid grid-cols-[1fr_12px_1fr] items-center gap-1.5 overflow-hidden">
								<span
									class="inline-block overflow-hidden rounded-md px-2 py-0.5 text-xs font-semibold text-ellipsis whitespace-nowrap shadow-sm transition-transform group-hover:scale-105"
									style="background-color: {fromInfo?.color}; color: {fromInfo?.textColor};"
								>
									{item.fromName}
								</span>
								<ArrowRight
									class="h-3 w-3 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
								/>
								<span
									class="inline-block overflow-hidden rounded-md px-2 py-0.5 text-xs font-semibold text-ellipsis whitespace-nowrap shadow-sm transition-transform group-hover:scale-105"
									style="background-color: {toInfo?.color}; color: {toInfo?.textColor};"
								>
									{item.toName}
								</span>
							</div>
							<span class="text-right text-xs font-bold text-brand-green tabular-nums"
								>{item?.r?.toLocaleString()}</span
							>
							<div class="sparkline-container pr-2">
								<div class="sparkline-bar" style="width: {(item.r / maxCommuters) * 100}%"></div>
							</div>
						</div>
					{/if}
				</div>
			</VirtualList>

			{#if hoveredRoute && !isMobile.current}
				<div
					class="pointer-events-none absolute left-0 z-50 w-full"
					style="top: {tooltipPosition.y}px;"
				>
					<div
						class="grid w-full grid-cols-[3fr_60px_60px] items-center gap-2 rounded-lg border-2 border-primary/30 bg-background p-2 text-xs font-normal shadow-lg backdrop-blur-sm md:w-auto md:grid-cols-[4fr_50px_90px] md:gap-1"
					>
						<div class="grid grid-cols-[1fr_12px_1fr] items-center gap-1.5 overflow-hidden">
							<span
								class="overflow-hidden rounded-md px-2 py-0.5 text-sm font-semibold text-ellipsis whitespace-nowrap shadow-sm"
								style="background-color: {stationInfoMap.get(hoveredRoute.f)
									?.color}; color: {stationInfoMap.get(hoveredRoute.f)?.textColor};"
							>
								{hoveredRoute.fromName}
							</span>
							<ArrowRight class="h-3 w-3 justify-self-center text-muted-foreground" />
							<span
								class="overflow-hidden rounded-md px-2 py-0.5 text-sm font-semibold text-ellipsis whitespace-nowrap shadow-sm"
								style="background-color: {stationInfoMap.get(hoveredRoute.t)
									?.color}; color: {stationInfoMap.get(hoveredRoute.t)?.textColor};"
							>
								{hoveredRoute.toName}
							</span>
						</div>
						<span class="text-right text-sm font-bold text-brand-green tabular-nums"
							>{hoveredRoute?.r?.toLocaleString()}</span
						>
						<div class="sparkline-container">
							<div
								class="sparkline-bar"
								style="width: {(hoveredRoute.r / maxCommuters) * 100}%"
							></div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="order-1 min-w-0 space-y-4 md:order-2">
			<div class="w-full rounded-xl border-2 border-border/60 bg-gradient-to-br from-background to-muted/30 p-6 shadow-sm">
				{#if selectedRoute}
					<div class="space-y-6">
						<div class="flex flex-wrap items-center justify-center gap-3 md:justify-start">
							<span
								class="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold shadow-md transition-transform hover:scale-105"
								style:background-color={stationInfoMap.get(selectedRoute.f)?.color}
								style:color={stationInfoMap.get(selectedRoute.f)?.textColor}
							>
								{selectedRoute.fromName}
							</span>
							<ArrowRight class="h-5 w-5 flex-shrink-0 text-muted-foreground" />
							<span
								class="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold shadow-md transition-transform hover:scale-105"
								style:background-color={stationInfoMap.get(selectedRoute.t)?.color}
								style:color={stationInfoMap.get(selectedRoute.t)?.textColor}
							>
								{selectedRoute.toName}
							</span>
						</div>

						<div class="grid grid-cols-2 gap-4 md:flex md:items-baseline md:gap-8">
							<div class="space-y-1">
								<div class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
									Daily Commuters
								</div>
								<div class="text-3xl font-bold text-brand-green tabular-nums md:text-4xl">
									{selectedRoute?.r?.toLocaleString()}
								</div>
							</div>

							<div class="space-y-1">
								<div class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
									Rank
								</div>
								<div class="text-3xl font-bold tabular-nums md:text-4xl">
									#{selectedRoute.rank}
								</div>
							</div>
						</div>
					</div>
				{:else}
					<div class="flex min-h-[120px] flex-col items-center justify-center space-y-3 text-center">
						<div class="rounded-full bg-muted p-4">
							<ArrowRight class="h-6 w-6 text-muted-foreground" />
						</div>
						<div class="space-y-1">
							<p class="text-sm font-medium text-foreground">No route selected</p>
							<p class="text-xs text-muted-foreground">
								Select stations above or click a route from the list
							</p>
						</div>
					</div>
				{/if}
			</div>

			<div class="overflow-hidden rounded-xl border border-border/50 bg-muted/10 shadow-sm">
				<MetroMap
					mode="route"
					fromStation={selections.from}
					toStation={selections.to}
					stationRadius={isMobile.current ? 1.5 : 2.5}
					showLanduse={false}
					height={isMobile.current ? 350 : 550}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.sparkline-container {
		width: 60px;
		height: 6px;
		background-color: var(--color-muted);
		border-radius: 3px;
		overflow: hidden;
	}
	@media (min-width: 768px) {
		.sparkline-container {
			width: 80px;
		}
	}
	.sparkline-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--color-brand-orange), var(--color-brand-yellow));
		border-radius: 3px;
		transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}
	
	.list-container {
		scrollbar-width: thin;
		scrollbar-color: var(--color-muted-foreground) transparent;
	}
	
	.list-container::-webkit-scrollbar {
		width: 6px;
	}
	
	.list-container::-webkit-scrollbar-track {
		background: transparent;
	}
	
	.list-container::-webkit-scrollbar-thumb {
		background-color: var(--color-muted-foreground);
		border-radius: 3px;
	}
	
	.list-container::-webkit-scrollbar-thumb:hover {
		background-color: var(--color-foreground);
	}
</style>
