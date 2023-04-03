<script>

</script>

<svelte:head>
	<title>Kam na mal'co</title>
	<meta name="description" content="Kam na mal'co app" />
</svelte:head>

<section>
	<h1>
		<span>
			Kam na mal'co 🤔
		</span>
	</h1>

	<h2>Vključene restavracije</h2>

	<ul>
		<li><a href="https://fresco.si/" target="_blank" rel="noreferrer">Fresco</a></li>
		<li><a href="http://restavracija-oe.si/" target="_blank" rel="noreferrer">Orient Express</a></li>
		<li><a href="http://www.rozaslon.si/" target="_blank" rel="noreferrer">Roza slon</a></li>
	</ul>


</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
