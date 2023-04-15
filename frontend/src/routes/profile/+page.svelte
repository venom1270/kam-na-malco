<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";

	export let data;

	let aiTokens = "?";
	if (typeof localStorage !== "undefined") {
        aiTokens = localStorage.getItem("aiTokens") ?? "?";
	}
	
	
</script>


<svelte:head>
	<title>Profile</title>
	<meta name="description" content="Kam na mal'co" />
</svelte:head>

<div class="text-column">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	
	<h1>Pozdravljen {data.user.name}</h1>

    <h4>Število žetonov: {aiTokens}</h4>

	<form use:enhance method="POST">
		<input type="submit" value="Odjava"/>
	</form>



</div>
