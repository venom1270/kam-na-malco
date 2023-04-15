<script lang="ts">
	import { invalidateAll } from "$app/navigation";

	function reloadData() {
		console.log("Reloading...")
		invalidateAll();
	}

	let prompt = "";

	async function tryPrompt() {
		aiLoading = true;
		console.log(data.user)
		try {
			let lsAiTokens = localStorage.getItem("aiTokens");
			if (lsAiTokens !== null) {
				let count = parseInt(lsAiTokens); 
				localStorage.setItem("aiTokens", (count - 1).toString());
			} 
		} catch (error) {
			// Nothing
		}
		
		const response = await fetch('/malca', {
			method: 'POST',
			body: JSON.stringify({ prompt, "username": data.user.name }),
			headers: {
				'content-type': 'application/json'
			}
		});


		let responseData = await response.json()

		if (typeof responseData === "string") {
			aiResponse = responseData;
		} else {
			aiResponse = responseData.choices[0].message?.content;
		}
		console.log(aiResponse);
		aiLoading = false;
		
	}


	async function getData() {
		// Asuming API has a route for '/aircrafts/id'
		// and 'id' is a url path param
		const response = await fetch('/malca', {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			}
		});

		let data = await response.json()

		return {
			today_data: data ?? []
		};
	}

	let aiLoading = false;

	let dataPromise = getData()
	export let data: any;
	console.log(data);


	let aiResponse = "Tukaj bo odgovor pomočnika";

</script>


<svelte:head>
	<title>Mal'ca</title>
	<meta name="description" content="Kam na mal'co" />
</svelte:head>

<div class="text-column">
	<!-- svelte-ignore a11y-click-events-have-key-events -->

	{#await dataPromise}
    	<p>Nalagam ...</p>
	{:then restaurantData}

		{#if data.user != undefined}
			<input type="text" placeholder="Kaj bi radi jedli?" bind:value={prompt} /><br/>
			<input type="button" value="Svetuj!" on:click={tryPrompt} disabled={aiLoading} />
			<br>
			{#if aiLoading}
				<code style="font-size: 20px;">Nalagam...</code>
			{:else}
				<code style="font-size: 20px;">{aiResponse}</code>
			{/if}
			
		{:else}
			<code>Prijavite se za uporabo pomočnika!</code>
		{/if}

		<h1>Meniji danes <span style="cursor: pointer;" on:click={reloadData}>🔃</span></h1>

		{#each restaurantData.today_data as restaurant}
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
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}




	

	

</div>
