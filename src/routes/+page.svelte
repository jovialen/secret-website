<script>
  import { collection, addDoc, getDocs } from 'firebase/firestore';
  import { FirebaseApp } from 'sveltefire';

  import { firestore } from '$lib/firebase.js';

  let secretCollection = collection(firestore, "secrets")
  let secretText = ""

  function addSecret() {
    addDoc(secretCollection, {
      text: secretText,
      complaints: 0,
    })
    secretText = ""
  }

  async function getRandomSecret() {
    let secretsQuery = await getDocs(secretCollection)
    let secrets = []
    secretsQuery.forEach(secret => {
      secrets.push(secret)
    })
    let secret = secrets[Math.floor(Math.random() * secrets.length)].data();
    console.log(secret)
  }
</script>

<FirebaseApp {firestore}>
  <h1>Secrets</h1>
  <p>Leave a secret, take a secret!</p>

  <form on:submit={addSecret}>
    <input type="text" placeholder="Leave your secret here..." bind:value={secretText} required />
    <button type="submit">Here's my secret, give me one of yours</button>
  </form>

  <button on:click={getRandomSecret}>Just give me a secret</button>
</FirebaseApp>
