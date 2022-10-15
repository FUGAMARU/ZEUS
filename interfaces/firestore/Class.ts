import { DocumentReference } from "firebase/firestore"

export interface Class {
  screenName: string,
  teacher: DocumentReference,
  lectures: {
    [key: string]: DocumentReference[] | null[]
  }
}