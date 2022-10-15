import { DocumentReference } from "firebase/firestore";

// "lectures"コレクション内の授業データー
export interface Lecture {
  name: string,
  hours: string,
  location: DocumentReference,
  teacher: DocumentReference,
  classroom: string,
  zoom: string
}