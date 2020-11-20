import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyArIWzdzVkIO_C7O99E-l1Acp-XOTcyYtA',
	authDomain: 'next-car-service-on-fire.firebaseapp.com',
	databaseURL: 'https://next-car-service-on-fire.firebaseio.com',
	projectId: 'next-car-service-on-fire',
	storageBucket: 'next-car-service-on-fire.appspot.com',
	messagingSenderId: '1013544497245',
	appId: '1:1013544497245:web:524ae91c5f357be6859db4',
	measurementId: 'G-H1LY3FMSHK',
};

const firebaseApp = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
	const result = await auth.signInWithPopup(googleProvider);
	return result;
};
