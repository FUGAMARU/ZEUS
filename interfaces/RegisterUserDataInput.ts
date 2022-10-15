import { DocumentReference } from "firebase/firestore"

// ユーザー情報登録時に送信するformの内容
export interface RegisterUserDataInput {
  name: string,
  class: DocumentReference
}