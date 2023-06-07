<script>
  import { collection, addDoc, getDocs } from 'firebase/firestore';
  import { FirebaseApp } from 'sveltefire';

  import { firestore } from '$lib/firebase.js';

  let secretCollection = collection(firestore, "secrets")
  let addSecretText = ""
  let getSecret = undefined

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
    getSecret = secrets[Math.floor(Math.random() * secrets.length)].data();
  }
</script>

<FirebaseApp {firestore}>
  <h1>Secrets</h1>
  <p>Leave a secret, take a secret!</p>

  <form on:submit={addSecret}>
    <input type="text" placeholder="Leave your secret here..." bind:value={addSecretText} required />
    <button type="submit">Here's my secret, give me one of yours</button>
  </form>

  {#if getSecret != undefined}
    <p>{getSecret.text}</p>
  {/if}


  <button on:click={getRandomSecret}>Just give me a secret</button>
</FirebaseApp>
