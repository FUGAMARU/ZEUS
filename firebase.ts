import { getApps, initializeApp } from "firebase/app"
//import { getAnalytics } from "firebase/analytics"
import { getAuth, User } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, getDoc, getFirestore, setDoc, collection, addDoc, getDocs, query, orderBy, limit, startAt } from "firebase/firestore"
import { whattimeIsIt } from "./functions"

let app
if(getApps().length < 1){
	app = initializeApp({
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
	})
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

interface Userdata {
	class: string,
	iconSrc: string,
	message: string,
	name: string,
	snsLinks: []
}

const getUserData = (uid: string): Promise<Userdata> => {
	return new Promise(async (resolve) => {
		const studentsDoc = await getDoc(doc(db, "students", uid))
		const teachersDoc = await getDoc(doc(db, "teachers", uid))

		if(studentsDoc.exists()){
			resolve(studentsDoc.data() as Userdata)
		}else if(teachersDoc.exists()){
			resolve(teachersDoc.data() as Userdata)
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

interface Thread {
	createdAt: number,
	createdBy: string,
	lastUpdate: number,
	responses: {
		uid?: string,
		sentAt?: number,
		text?: string
	}[],
	title: string
}

interface Threads {
	id: string,
	title: string,
	lastUpdate: number
}

const getLectureData = (target: string, uid: string, UNIXTime: number): Promise<any> => { //return => object, ""(授業未開講時)
	return new Promise(async (resolve) => {
		const dayOfWeekStr = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date(UNIXTime * 1000).getDay()]
		if(dayOfWeekStr !== "sun" && dayOfWeekStr !== "sat"){ //土日に開講している授業は無い
			const hour = whattimeIsIt(UNIXTime, target) //今が何時限目なのか
			//UIDから所属クラスを特定
			const studentDoc = await getDoc(doc(db, "students", uid))
			const studentData = studentDoc.data()
			const classId: string = studentData?.class

			//クラスIDと現在の時間から授業IDを特定
			const classDoc = await getDoc(doc(db, "classes", classId))
			const classData = classDoc.data()

			if(target === "current"){
				if(hour !== -1 && hour !== 0){
					if(classData){
						const lectureID: string|null = classData["lectures"][dayOfWeekStr][hour - 1]
						if(lectureID === null){
							resolve("")
						}else{
							//授業IDから授業情報を取得
							const lectureDoc = await getDoc(doc(db, "lectures", lectureID))
							resolve(lectureDoc.data())
						}
					}
				}else{
					resolve("")
				}
			}else if(target === "next"){
				if(hour !== -1 && hour !== 8){ //8時間目の次はない
					if(classData){
						const lectureID: string|null = classData["lectures"][dayOfWeekStr][hour]
						if(lectureID === null){
							resolve("")
						}else{
							//授業IDから授業情報を取得
							const lectureDoc = await getDoc(doc(db, "lectures", lectureID))
							resolve(lectureDoc.data())
						}
					}
				}else{
					resolve("")
				}
			}
		}else{
			resolve("")
		}
	})
}

const getClassName = (uid: string): Promise<string> => {
	return new Promise(async (resolve) => {
		//UIDから所属クラスを特定
		const studentDoc = await getDoc(doc(db, "students", uid))
		const studentData = studentDoc.data()
		const classId: string = studentData?.class

		const classDoc = await getDoc(doc(db, "classes", classId))
		const classData = classDoc.data()
		if(classData) resolve(classData.screenName)
	})
}

const getThreads = (startUNIXTime: number): Promise<Threads[]> => {
	return new Promise (async (resolve) => {
		let threads: Threads[] = []
		if(startUNIXTime === 0){
			const querySnapshot = await getDocs(query(collection(db, "threads"), orderBy("createdAt", "desc"), limit(20)))
			querySnapshot.forEach((doc) => {
				const data = doc.data() as Thread
				threads.push({
					id: doc.id,
					title: data.title,
					lastUpdate: data.lastUpdate
				})	
			})
		}else{
			const querySnapshot = await getDocs(query(collection(db, "threads"), orderBy("createdAt", "desc"), startAt(startUNIXTime), limit(20)))
			querySnapshot.forEach((doc) => {
				const data = doc.data() as Thread
				threads.push({
					id: doc.id,
					title: data.title,
					lastUpdate: data.lastUpdate
				})	
			})
		}
		resolve(threads)
	})
}

const createBBSThread = (uid: string, title: string, UNIXTime: number): Promise<Threads> => {
	return new Promise(async (resolve) => {
		const threadsRef = collection(db, "threads")
		const newRef = await addDoc(threadsRef, {
			title: title,
			createdAt: UNIXTime,
			createdBy: uid,
			lastUpdate: UNIXTime,
			responses: []
		} as Thread)
		resolve({
			id: newRef.id,
			title: title,
			lastUpdate: UNIXTime
		})
	})
}

const getResponses = (id: string): Promise<any> => {
	return new Promise(async (resolve) => {
		const threadRef = await getDoc(doc(db, "threads", id))
		const threadData = threadRef.data() as Thread
		resolve(threadData.responses)
	})
}

export { auth, provider, checkUserDataExists, registerUserInformation, getUserData, getLectureData, getClassName, getThreads, createBBSThread, getResponses }