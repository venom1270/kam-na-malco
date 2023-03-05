<script lang="ts">
	import type { PageData } from "./$types";
	import type { Restaurant } from "./model";
	import { invalidateAll } from "$app/navigation";

	function reloadData() {
		console.log("Reloading...")
		invalidateAll();
	}


	export let data: PageData;
	let restaurants: Restaurant[] = data.today_data;
    $: (restaurants = data.today_data);

</script>


<svelte:head>
	<title>Mal'ca</title>
	<meta name="description" content="Kam na mal'co" />
</svelte:head>

<div class="text-column">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<h1>Meniji danes <span style="cursor: pointer;" on:click={reloadData}>🔃</span></h1>

	{#each restaurants as restaurant}
		<div>
			<h2><strong>{restaurant.name}</strong></h2>

			{#if restaurant.menus.length == 0 || restaurant.menus[0].items.length == 0}
				<p>Ni menija</p>
			{:else}
				<ul>
					{#each restaurant.menus[0].items as item}
						<li class="hoverImg">
							<span>
							<i>{item.name}:</i> {item.food} <strong>{item.price}€</strong>
							<span><img src="{item.image_url}" alt="" height="100" /></span>
							</span>
						</li>
					{/each}
				</ul>
			{/if}

			
		</div>
	{/each}

</div>
