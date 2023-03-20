<script lang="ts">
	let username = "";
	let password = "";


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
	<h1>Login</h1>

	<input type="text" placeholder="username" bind:value={username} />
	<br>
	<input type="password" placeholder="password" bind:value={password} />
	<br>
	<input type="button" value="Log in" on:click={tryLogin} />


</div>
