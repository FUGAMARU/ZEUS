import { getApps, initializeApp } from "firebase/app"
//import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import { whattimeIsIt } from "./functions"

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
const db = getFirestore(app)

const checkUserDataExists = async (uid: string) => {
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

interface UserData {
	name: string,
	class: string,
	iconSrc?: string,
	message?: string,
	snsLinks?: string[]
}

const registerUserInformation = (uid: string, accountType: string, userData: UserData, userIcon: any) => {
	console.log("======================")
	console.log(uid)
	console.log(accountType)
	console.log(userData)
	const docRef = accountType === "student" ? doc(db, "students", uid) : doc(db, "teachers", uid)

	return new Promise(async (resolve, reject) => {
		if(userIcon === null){
			userData.iconSrc = "https://firebasestorage.googleapis.com/v0/b/zeus-9bc47.appspot.com/o/user-icon%2Fnoicon.png?alt=media&token=385aba6d-1124-462d-acd2-972d36fd9fec"
		}else{
			try{
				const snapshot = await uploadBytes(ref(storage, `user-icon/${uid}.jpg`), userIcon)
				const iconSrcURL = await getDownloadURL(snapshot.ref)
				console.log(`アップロード完了！ => ${iconSrcURL}`)
				userData.iconSrc = iconSrcURL
			}catch{
				console.log("ユーザーアイコンアップロード時にエラーが発生しました")
				reject()
			}
		}
	
		try{
			userData.message = ""
			userData.snsLinks = []
			await setDoc(docRef, userData)
			console.log("ユーザー情報登録完了")
			resolve("ユーザー情報登録完了")
		}catch{
			console.log("ユーザー情報登録時にエラーが発生しました")
			reject()
		}
	})
}

const getUserData = (uid: string): Promise<any> => {
	return new Promise(async (resolve) => {
		const studentsDoc = await getDoc(doc(db, "students", uid))
		const teachersDoc = await getDoc(doc(db, "teachers", uid))

		if(studentsDoc.exists()){
			const docData = studentsDoc.data()
			resolve(docData)
		}else if(teachersDoc.exists()){
			const docData = teachersDoc.data()
			resolve(docData)
		}
	})
}

interface ObjectTypes {
	name: string,
	hours: string,
	location: string,
	teacher: string,
	classroom: string,
	zoom: string
}

const getLectureData = (target: string, uid: string, UNIXTime: number): Promise<any> => { //return => object, ""(授業未開講時)
	return new Promise(async (resolve) => {
		const hour = whattimeIsIt(UNIXTime) //今が何時限目なのか
		if(hour === 0){ //授業未開講時
			resolve("")
		}else{
			if(target === "current"){
				//UIDから所属クラスを特定
				const studentDoc = await getDoc(doc(db, "students", uid))
				const studentData = studentDoc.data()
				const classId: string = studentData?.class
		
				//クラスIDと現在の時間から授業IDを特定
				const dayOfWeekStr = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date(UNIXTime * 1000).getDay()]
				const classDoc = await getDoc(doc(db, "classes", classId))
				const classData = classDoc.data()
				if(classData){
					const lectureID: string|null = classData["lectures"][dayOfWeekStr][hour - 1]
					//授業IDから授業情報を取得
					if(lectureID === null){
						resolve("")
					}else{
						const lectureDoc = await getDoc(doc(db, "lectures", lectureID))
						resolve(lectureDoc.data())
					}
				}
			}else if(target === "next"){
				if(hour === 8){ //8時間目の次はない
					resolve("")
				}else{
					//...
				}
			}
		}
	})
}

export { auth, provider, checkUserDataExists, registerUserInformation, getUserData, getLectureData }