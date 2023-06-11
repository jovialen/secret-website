<script>
	import { createEventDispatcher } from 'svelte';

	export let secret = '';

	const dispatch = createEventDispatcher();

	function reset() {
		dispatch('reset');
	}

	function complain() {
		dispatch('complain');
	}
</script>

<p>{secret}</p>
<button class="continue" on:click={reset}>Continue</button>
<button class="complain" on:click={complain}>Bad secret</button>

<style>
	p {
    margin-bottom: 3rem;
    font-size: 1.5rem;
	}

	button.continue {
		background: #689D6A;
		border: none;
	}

	button.continue:hover {
		background: #8EC07C;
	}

	button.complain:hover {
		background: #FB4934;
		border-color: #FB4934;
	}
</style>

