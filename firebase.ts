import { getApps, initializeApp } from "firebase/app"
//import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, getDoc, getFirestore, setDoc, collection, addDoc, getDocs, query, orderBy, limit, startAt, updateDoc, arrayUnion, CollectionReference, DocumentReference } from "firebase/firestore"
import { whattimeIsIt } from "./functions"
import { Threads, Responses, ThreadHeadings, Res } from "./Interfaces"

// Interfaces
import { Lecture } from "./interfaces/firestore/Lecture"
import { Teacher } from "./interfaces/firestore/Teacher"
import { Location } from "./interfaces/firestore/Location"
import { Class } from "./interfaces/firestore/Class"
import { User } from "./interfaces/firestore/User"
import { RegisterUserDataInput } from "./interfaces/form/RegisterUserDataInput"

// Class
import { RegisterUser } from "./classes/RegisterUser"

let app
if (getApps().length < 1) {
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

  if (studentsDoc.exists() || teachersDoc.exists()) {
    console.log("Firestoreに該当ユーザーデーターあり")
    return true
  } else {
    console.log("Firestoreに該当ユーザーデーターなし")
    return false
  }
}

const registerUserInformation = (uid: string, userData: RegisterUserDataInput, userIcon: any) => {
  const registerUser = new RegisterUser()

  return new Promise(async (resolve, reject) => {
    if (userIcon === null) {
      registerUser.setIconSrc = "https://firebasestorage.googleapis.com/v0/b/zeus-9bc47.appspot.com/o/user-icon%2Fnoicon.png?alt=media&token=385aba6d-1124-462d-acd2-972d36fd9fec"
    } else {
      try {
        const snapshot = await uploadBytes(ref(storage, `user-icon/${uid}.jpg`), userIcon)
        const iconSrcURL = await getDownloadURL(snapshot.ref)
        console.log(`アップロード完了！ => ${iconSrcURL}`)
        registerUser.setIconSrc = iconSrcURL
      } catch {
        console.log("ユーザーアイコンアップロード時にエラーが発生しました")
        reject()
      }
    }

    try {
      registerUser.setClassRef = userData.class
      registerUser.setName = userData.name
      registerUser.setMessage = ""
      registerUser.setSnsLinks = []

      await setDoc(doc(db, "students", uid), registerUser.toObject())
      console.log("ユーザー情報登録完了")
      resolve("ユーザー情報登録完了")
    } catch {
      console.log(registerUser)
      console.log("ユーザー情報登録時にエラーが発生しました")
      reject()
    }
  })
}

const getUserData = (uid: string): Promise<User> => {
  return new Promise(async (resolve) => {
    const userRef = await getDoc(doc(db, "students", uid))
    resolve(userRef.data() as User)
  })
}

const getLectureData = (target: string, uid: string, UNIXTime: number): Promise<Lecture | string> => { //return => object, ""(授業未開講時)
  return new Promise(async (resolve) => {
    const dayOfWeekStr = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date(UNIXTime * 1000).getDay()]
    if (dayOfWeekStr !== "sun" && dayOfWeekStr !== "sat") { //土日に開講している授業は無い
      const hour = whattimeIsIt(UNIXTime, target) //今が何時限目なのか
      //UIDから所属クラスを特定
      const userRef = await getDoc(doc(db, "students", uid))
      const userData = userRef.data() as User

      //クラスIDと現在の時間から授業IDを特定
      const classDoc = await getDoc(userData.class)
      const classData = classDoc.data() as Class

      if (target === "current") {
        if (hour !== -1 && hour !== 0) {
          if (classData) {
            const lectureRef: DocumentReference | null = classData.lectures[dayOfWeekStr][hour - 1]
            if (lectureRef === null) {
              resolve("")
            } else {
              //参照から授業情報を取得
              const lectureDoc = await getDoc(lectureRef)
              resolve(lectureDoc.data() as Lecture)
            }
          }
        } else {
          resolve("")
        }
      } else if (target === "next") {
        if (hour !== -1 && hour !== 8) { //8時間目の次はない
          if (classData) {
            const lectureRef: DocumentReference | null = classData.lectures[dayOfWeekStr][hour]
            if (lectureRef === null) {
              resolve("")
            } else {
              //参照から授業情報を取得
              const lectureDoc = await getDoc(lectureRef)
              resolve(lectureDoc.data() as Lecture)
            }
          }
        } else {
          resolve("")
        }
      }
    } else {
      resolve("")
    }
  })
}

const getThreads = (startUNIXTime: number): Promise<ThreadHeadings[]> => {
  return new Promise(async (resolve) => {
    let threads: ThreadHeadings[] = []
    if (startUNIXTime === 0) {
      const querySnapshot = await getDocs(query(collection(db, "threads"), orderBy("createdAt", "desc"), limit(20)))
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        threads.push({
          id: doc.id,
          title: data.title,
          lastUpdate: data.lastUpdate
        })
      })
    } else {
      const querySnapshot = await getDocs(query(collection(db, "threads"), orderBy("createdAt", "desc"), startAt(startUNIXTime), limit(20)))
      querySnapshot.forEach((doc) => {
        const data = doc.data()
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

const createBBSThread = (uid: string, title: string, UNIXTime: number): Promise<ThreadHeadings> => {
  return new Promise(async (resolve) => {
    const threadsRef = collection(db, "threads")
    const newRef = await addDoc(threadsRef, {
      title: title,
      createdAt: UNIXTime,
      createdBy: uid,
      lastUpdate: UNIXTime,
      responses: []
    } as Threads)
    resolve({
      id: newRef.id,
      title: title,
      lastUpdate: UNIXTime
    })
  })
}

const getResponses = (id: string): Promise<Responses[]> => {
  return new Promise(async (resolve) => {
    const threadRef = await getDoc(doc(db, "threads", id))
    const threadData = threadRef.data() as Threads
    resolve(threadData.responses)
  })
}

const postRes = (id: string, uid: string, UNIXTime: number, text: string): Promise<Res> => {
  return new Promise(async (resolve) => {
    const threadRef = doc(db, "threads", id)
    await updateDoc(threadRef, {
      responses: arrayUnion({
        uid: uid,
        sentAt: UNIXTime,
        text: text
      } as Responses)
    })
    const userdata = await getUserData(uid)
    resolve({
      sentAt: UNIXTime,
      text: text,
      userdata: {
        name: userdata.name,
        iconUrl: userdata.iconSrc
      }
    } as Res)
  })
}

export const getLocationFromReference = (ref: DocumentReference): Promise<Location> => {
  return new Promise(async (resolve) => {
    const reference = await getDoc(ref)
    resolve(reference.data() as Location)
  })
}

export const getTeacherFromReference = (ref: DocumentReference): Promise<Teacher> => {
  return new Promise(async (resolve) => {
    const reference = await getDoc(ref)
    resolve(reference.data() as Teacher)
  })
}

export const getClassFromReference = (ref: DocumentReference): Promise<Class> => {
  return new Promise(async (resolve) => {
    const reference = await getDoc(ref)
    resolve(reference.data() as Class)
  })
}

export const getClassReferenceFromString = (str: string): Promise<DocumentReference> => {
  return new Promise(async (resolve) => {
    resolve(doc(db, "classes", str))
  })
}

export { auth, provider, checkUserDataExists, registerUserInformation, getUserData, getLectureData, getThreads, createBBSThread, getResponses, postRes }