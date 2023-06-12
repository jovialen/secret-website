import { collection, doc, addDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '$lib/firebase.js';

// The manifest is here to have a single document refrencing all the secrets
// in the collection. Without it, the only way to select a random document
// from the collection would be by reading all of them, and then selecting a
// random one after that. This results in a ludicrous amount of reads, and
// is therefore dumb.
export const secretsManifestDoc = doc(firestore, "secrets/manifest");
export const secretsCollection = collection(firestore, 'secrets');

async function addToManifest(id) {
	let manifest = (await getDoc(secretsManifestDoc)).data();
	manifest.ids.push(id);
	updateDoc(secretsManifestDoc, manifest);
}

async function removeFromManifest(id) {
	let manifest = (await getDoc(secretsManifestDoc)).data();
	manifest.ids = manifest.ids.filter(item => item !== id);
	updateDoc(secretsManifestDoc, manifest);
}

export async function addSecret(text) {
	let ref = await addDoc(secretsCollection, {
		text: text,
		complaints: 0
	});
	console.log(ref.id);
	await addToManifest(ref.id);
}

export async function getRandomSecret() {
	let manifest = (await getDoc(secretsManifestDoc)).data();
	let id = manifest.ids[Math.floor(Math.random() * manifest.ids.length)];
	let secret = await getDoc(doc(secretsCollection, id));
	return {
		id: id,
		...secret.data()
	}
}

export async function getSecretCount() {
	let query = await getDoc(secretsManifestDoc);
	return query.data().ids.length;
}

export async function complainSecret(secret) {
	let secretDoc = doc(secretsCollection, secret.id);
	let complaints = (await getDoc(secretDoc)).data().complaints + 1;

	if (complaints < 5) {
		updateDoc(secretDoc, {
			complaints: complaints
		});
	} else {
		deleteDoc(secretDoc);
		removeFromManifest(secret.id);
	}
}
