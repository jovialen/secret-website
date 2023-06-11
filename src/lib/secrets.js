import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '$lib/firebase.js';

export const secretsCollection = collection(firestore, 'secrets');

export async function addSecret(text) {
	addDoc(secretsCollection, {
		text: text,
		complaints: 0
	});
}

export async function getRandomSecret() {
	let secrets = (await getDocs(secretsCollection)).docs;
	let selectedSecret = secrets[Math.floor(Math.random() * secrets.length)];
	let data = selectedSecret.data();
	return {
		id: selectedSecret.id,
		...data
	};
}

export async function complainSecret(secret) {
	let secretDoc = doc(secretsCollection, secret.id);
	let complaints = (await getDoc(secretDoc)).data().complaints + 1;

	if (complaints < 10) {
		updateDoc(secretDoc, {
			complaints: complaints
		});
	} else {
		deleteDoc(secretDoc);
	}
}
