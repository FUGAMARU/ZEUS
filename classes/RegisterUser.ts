import { User } from "../interfaces/firestore/User"
import { DocumentReference } from "firebase/firestore"

export class RegisterUser implements User {
  class: DocumentReference
  name: string
  message: string
  iconSrc: string
  snsLinks: string[]

  constructor() { }

  set setClassRef(classRef: DocumentReference) {
    this.class = classRef
  }

  set setName(name: string) {
    this.name = name
  }

  set setMessage(message: string) {
    this.message = message
  }

  set setIconSrc(iconSrc: string) {
    this.iconSrc = iconSrc
  }

  set setSnsLinks(snsLinks: string[]) {
    this.snsLinks = snsLinks
  }

  toObject() {
    return {
      class: this.class,
      iconSrc: this.iconSrc,
      message: this.message,
      name: this.name,
      snsLinks: this.snsLinks
    }
  }
}