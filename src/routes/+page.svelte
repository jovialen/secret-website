<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { addSecret, getRandomSecret, complainSecret, getSecretCount } from '$lib/secrets.js';

  import InputForm from './input-form.svelte';
  import SecretReveal from './secret-reveal.svelte';

  let secretCount = "Laster...";
  let revealedSecret = undefined;

  async function submit(event) {
    // Get a random secret before adding the new one to prevent any chance of
    // getting your own secret back
    revealedSecret = await getRandomSecret();
    console.log(revealedSecret)

    if (event.detail.secret == "skip") {
      console.log("Skipping submission");
      return;
    }

    addSecret(event.detail.secret);
  }

  async function complain() {
    complainSecret(revealedSecret);
    reset();
  }

  function reset() {
    revealedSecret = undefined;
  }

  onMount(async () => {
    secretCount = await getSecretCount();
  });
</script>

<p>Antall hemmeligheter i spill: {secretCount}</p>

<main>
  <header>
    <h1>Hemmeligheter</h1>
    <h3>
      <span style:color={revealedSecret === undefined ? '#FB4934' : ''}>Gi en Hemmelighet</span>,
      <span style:color={revealedSecret !== undefined ? '#689D6A' : ''}>Få en Hemmelighet!</span>
    </h3>
  </header>

  <div class="wrapper">
    {#if revealedSecret !== undefined}
      <div class="content" transition:fly={{ x: "100%", duration: 300 }}>
        <SecretReveal secret={revealedSecret.text} on:reset={reset} on:complain={complain}></SecretReveal>
      </div>
    {:else}
      <div class="content" transition:fly={{ x: "-100%", duration: 300 }}>
        <InputForm on:submit={submit}></InputForm>
      </div>
    {/if}
  </div>
</main>

<style>
  p {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 0.8rem;
    color: #79838ef0;
  }
  
  main {
    display: block;
    position: absoulte;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    padding: 2rem;
  }

  header {
    margin-bottom: 4rem;
  }

  div.wrapper {
    height: 200px;
  }

  div.content {
    width: 100%;
    position: absolute;
  }

  /* Small screens */
  @media (min-width: 640px)  {
    main {
      max-width: 640px;
    }
  }
  
  /* Medium screens */
  @media (min-width: 768px)  {
    main {
      max-width: 640px;
    }
  }
  
  /* Large screens */
  @media (min-width: 1024px) {
    main {
      max-width: 768px;
    }
  }
  
  /* XL screens */
  @media (min-width: 1280px) {
    main {
      max-width: 1024px;
    }
  }
  
  /* XXL screens */
  @media (min-width: 1536px) {
    main {
      max-width: 1280px;
    }
  }
</style>

