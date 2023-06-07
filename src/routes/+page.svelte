<script>
  import { collection } from 'firebase/firestore';
  import { FirebaseApp } from 'sveltefire';

  import { firestore } from '$lib/firebase.js';
</script>

<FirebaseApp {firestore}>
  <h1>Secrets</h1>

  <p>Leave a secret, take a secret!</p>
</FirebaseApp>
