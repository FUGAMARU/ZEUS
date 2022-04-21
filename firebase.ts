import { getApps, initializeApp } from "firebase/app"
//import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { doc, getDoc, getFirestore } from "firebase/firestore"

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
	app = initializeApp(firebaseConfig)
}
//const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const storage = getStorage(app)

const uploadImage = async (uid:string, file: Blob) => {
	try{
		await uploadBytes(ref(storage, `user-icon/${uid}.jpg`), file).then((snapshot) => {
			console.log("アイコン画像をFirebase Cloud Storageにアップロードしました")
			console.log(snapshot)
		})
	}catch{
		console.log("アイコン画像のFirebase Cloud Storageアップロード時にエラーが発生しました")
	}
}

const db = getFirestore(app)
const checkUserExists = async (uid: string) => {
	const studentsDoc = await getDoc(doc(db, "students", uid))
	const teachersDoc = await getDoc(doc(db, "teachers", uid))

	if(studentsDoc.exists() || teachersDoc.exists()){
		console.log("Firestoreに該当ユーザーデーターあり")
		return true
	}else{
		console.log("Firestoreに該当ユーザーデーターなし")
		return false
	}
}

export { auth, provider, uploadImage, checkUserExists }