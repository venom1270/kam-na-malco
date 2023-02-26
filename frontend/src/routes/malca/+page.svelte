<script lang="ts">
	import type { PageData } from "./$types";
	import type { Restaurant } from "./model";



	/*import { supabase } from '$lib/supabaseClient'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import './styles.css'

	onMount(() => {
		const {
		data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
		invalidate('supabase:auth')
		})

		return () => {
		subscription.unsubscribe()
		}
	})*/

	//export let data: [{id: number, name: string}];
	export let data: PageData;
	let restaurants: Restaurant[] = data.today_data;
	console.log(restaurants)
    $: (restaurants = data.today_data);

</script>


<svelte:head>
	<title>Mal'ca</title>
	<meta name="description" content="Kam na mal'co" />
</svelte:head>

<div class="text-column">
	<h1>Meniji danes</h1>

	{#each restaurants as restaurant}
		<div>
			<h2><strong>{restaurant.name}</strong></h2>

			{#if restaurant.menus.length == 0 || restaurant.menus[0].items.length == 0}
				<p>Ni menija</p>
			{:else}
				<ul>
					{#each restaurant.menus[0].items as item}
						<li>{item.name}: {item.food} ({item.price})</li>
					{/each}
				</ul>
			{/if}

			
		</div>
	{/each}

</div>
