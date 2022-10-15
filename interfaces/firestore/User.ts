import { DocumentReference } from "firebase/firestore"

export interface User {
  class: DocumentReference,
  name: string,
  message: string,
  iconSrc: string,
  snsLinks: string[]
}