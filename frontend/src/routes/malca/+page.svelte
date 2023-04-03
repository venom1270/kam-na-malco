<script lang="ts">
	import type { PageData } from "./$types";
	import type { Restaurant } from "./model";
	import { invalidateAll } from "$app/navigation";

	function reloadData() {
		console.log("Reloading...")
		invalidateAll();
	}

	let prompt = "";

	async function tryPrompt() {
		console.log(data.user)
		const response = await fetch('/malca', {
			method: 'POST',
			body: JSON.stringify({ prompt, "username": data.user.name }),
			headers: {
				'content-type': 'application/json'
			}
		});


		let responseData = await response.json()
		console.log(responseData);
		aiResponse = responseData.data?.data.choices.completion_data[0].message?.content;
		
	}


	export let data: PageData;
	let restaurants: Restaurant[] = data.today_data;
    $: (restaurants = data.today_data);

	let aiResponse = "Tukaj bo odgovor pomočnika";

</script>


<svelte:head>
	<title>Mal'ca</title>
	<meta name="description" content="Kam na mal'co" />
</svelte:head>

<div class="text-column">
	<!-- svelte-ignore a11y-click-events-have-key-events -->

	{#if data.user != undefined}
		<input type="text" placeholder="Kaj bi radi jedli?" bind:value={prompt} /><br/>
		<input type="button" value="Svetuj!" on:click={tryPrompt} />
		<br>
		<code style="font-size: 20px;">{aiResponse}</code>
	{:else}
		<code>Prijavite se za uporabo pomočnika!</code>
	{/if}

	

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
