<script>
	import Counter from './Counter.svelte';
</script>

<svelte:head>
	<title>pee pee</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div id="section">
	<h1>
		pee pee kaki in pee pee kakaland
	</h1>

	<h2>
		Bitches today:
	</h2>

	<Counter/>

	<img src="meg.jpg" alt="meg" id="meg">
</div>

<style>
	#section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
		border-radius: 15px;
		width: 90vw;
		height: 90vh;
	}

	#meg {
		width: 600px;
		border-radius: 15px;
	}
</style>
