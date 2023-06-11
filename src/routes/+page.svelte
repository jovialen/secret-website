<script>
  import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

  import { firestore } from '$lib/firebase.js';

  let secretCollection = collection(firestore, "secrets")
  let addSecretText = ""
  let revealedSecret = undefined

  getRandomSecret()

  function addSecret() {
    // Get a random secret before adding the new one to prevent any chance of
    // getting your own secret back
    getRandomSecret()

    addDoc(secretCollection, {
      text: addSecretText,
      complaints: 0,
    })
    addSecretText = ""
  }

  async function getRandomSecret() {
    let secretsQuery = await getDocs(secretCollection)
    let secrets = []
    secretsQuery.forEach((secret) => {
      secrets.push(secret)
    })
    let selectedSecret = secrets[Math.floor(Math.random() * secrets.length)]
    let data = selectedSecret.data()
    revealedSecret = {
      id: selectedSecret.id,
      ...data
    }
  }

  async function complain() {
    if (revealedSecret === undefined) {
      return;
    }

    let secretDoc = doc(secretCollection, revealedSecret.id)

    if (revealedSecret.complaints < 10) {
      // Get the newest complaints number before incrementing to prevent a
      // race condition
      // TODO: This is not the right way to do this, I just want to be done
      let complaints = await getDoc(secretDoc).complaints + 1
      await updateDoc(secretDoc, {
        complaints: complaints,
      })
    } else {
      // Delete a secret if it is very unpopular
      await deleteDoc(secretDoc)
    }

    reset()
  }

  function reset() {
    revealedSecret = undefined
  }
</script>

<main>
  <header>
    <h1>Secrets</h1>
    <h3>
      <span style:color={revealedSecret === undefined ? '#FB4934' : ''}>Give a secret</span>,
      <span style:color={revealedSecret !== undefined ? '#689D6A' : ''}>Get a secret!</span>
    </h3>
  </header>

  <div class="content">
    {#if revealedSecret !== undefined}
      <p>{revealedSecret.text}</p>
      <button on:click={reset}>Continue</button>
      <button on:click={complain}>Bad secret</button>
    {:else}
      <p>Whatever you type will be kept anonymous for whomever sees it.</p>

      <form on:submit={addSecret}>
        <input type="text" placeholder="Leave your secret here..." bind:value={addSecretText} required />
        <button type="submit">Here's my secret, give me one of yours</button>
      </form>
    {/if}
  </div>
</main>


<style>
  main {
    display: block;
    position: absoulte;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    padding: 2rem;
  }

  header {
    margin-bottom: 4rem;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
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
    cursor: pointer;
    border-color: #689D6A;
    background: #689D6A;
    min-width: fit-content;
  }

  button[type="submit"]:hover {
    background: #8EC07C;
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

