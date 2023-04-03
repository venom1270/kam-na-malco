<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";


	let username = "";
	let password = "";

	export let data: PageData;


	async function tryLogin() {
		console.log(username);
		console.log(password);
		console.log(JSON.stringify({ username, password }));
		const response = await fetch('/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: {
				'content-type': 'application/json'
			}
		});


		let data = await response.json()
		console.log(data);

		if (data.id != -1) {
			alert("Login successful!");
		}
		
	}

</script>


<svelte:head>
	<title>Login</title>
	<meta name="description" content="Kam na mal'co" />
</svelte:head>

<div class="text-column">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<h1>Prijava</h1>

	
	<form use:enhance method="POST">
		<input type="text" placeholder="Uporabniško ime" name="username" bind:value={username} /><br>
		<br>
		<input type="password" placeholder="Geslo" name="password" bind:value={password} /><br>
		<br>
		<input type="submit" value="Prijava"/>
	</form>

	<!--h2>Old (POST API)</h2>
	
	<input type="text" placeholder="username" name="username" bind:value={username} />
	<br>
	<input type="password" placeholder="password" name="password" bind:value={password} />
	<br>
	<input type="submit" value="Log in" on:click={tryLogin} /-->



</div>
