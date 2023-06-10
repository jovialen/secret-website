<script>
  import { collection, addDoc, getDocs } from 'firebase/firestore';

  import { firestore } from '$lib/firebase.js';

  let secretCollection = collection(firestore, "secrets")
  let addSecretText = ""
  let revealedSecret = undefined

  function addSecret() {
    addDoc(secretCollection, {
      text: addSecretText,
      complaints: 0,
    })
    addSecretText = ""
  }

  async function getRandomSecret() {
    let secretsQuery = await getDocs(secretCollection)
    let secrets = []
    secretsQuery.forEach(secret => {
      secrets.push(secret)
    })
    revealedSecret = secrets[Math.floor(Math.random() * secrets.length)].data()
  }
</script>

<main>
  <header>
    <h1>Secrets</h1>
    <h2>Give a secret, Get a secret!</h2>
  </header>

  <div>
    {#if revealedSecret != undefined}
      {revealedSecret.text}
    {:else}
      <form on:submit={addSecret}>
        <input type="text" placeholder="Leave your secret here..." bind:value={addSecretText} required />
        <button type="submit">Here's my secret, give me one of yours</button>
      </form>

      <button on:click={getRandomSecret}>Just give me a secret</button>
    {/if}
  </div>
</main>


<style>
  main {
    display: block;
    position: absoulte;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  header {
    color: #dedede;
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
      max-width: 768px;
    }
  }
  
  /* Large screens */
  @media (min-width: 1024px) {
    main {
      max-width: 1024px;
    }
  }
  
  /* XL screens */
  @media (min-width: 1280px) {
    main {
      max-width: 1280px;
    }
  }
  
  /* XXL screens */
  @media (min-width: 1536px) {
    main {
      max-width: 1536px;
    }
  }
</style>

