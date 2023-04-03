<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";

	export let data;

	/*async function logout() {
		console.log("logging out...");
		const response = await fetch('/profile', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});


		let data = await response.json()
		console.log(data);

		if (data.success) {
			alert("Logout successful!");
		}
	}*/
	
</script>


<svelte:head>
	<title>Profile</title>
	<meta name="description" content="Kam na mal'co" />
</svelte:head>

<div class="text-column">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	
	<h1>Pozdravljen {data.user.name}</h1>

    <h4>Število žetonov: {data.user.ai_tokens}</h4>

	<form use:enhance method="POST">
		<input type="submit" value="Odjava"/>
	</form>



</div>
