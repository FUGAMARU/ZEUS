import { getApps, initializeApp } from "firebase/app"
//import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

let app
if(getApps().length < 1){
	app = initializeApp(firebaseConfig);
}
//const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }