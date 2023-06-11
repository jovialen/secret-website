<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let text = '';
	function submitSecret() {
		dispatch('submit', {
			secret: text
		});
		text = "";
	}
</script>

<div>
	<p>Whatever you type will be kept anonymous for whomever sees it.</p>

	<form on:submit={submitSecret}>
	  <input type='text' placeholder='Leave your secret here...' bind:value={text} required />
	  <button type='submit'>Here's my secret, give me one of yours</button>
	</form>
</div>

<style>
	div > * {
		margin-bottom: 1rem;
	}

	div:last-child {
		margin-bottom: 0;
	}

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  input, button {
    padding: 1rem;
    color: #dedede;
    background: none;
    font-size: 0.8rem;
    border: 1px solid;
    border-radius: 0.5rem;
  }

  input[type="text"] {
    flex-grow: 1;
    border-color: #dedede;
  }

  button[type="submit"] {
    border-color: #689D6A;
    background: #689D6A;
    min-width: fit-content;
  }

  button[type="submit"]:hover {
    background: #8EC07C;
  }

  /* Medium screens */
  @media (min-width: 768px)  {
    form {
      flex-direction: row;
      gap: 0;
    }

    input[type="text"] {
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    button[type="submit"] {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
	}
</style>

