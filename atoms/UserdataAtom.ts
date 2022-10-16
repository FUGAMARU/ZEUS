import { atom } from "recoil"
import { LocalizedUserData } from "../interfaces/atom/LocalizedUserData"

export const UserdataAtom = atom<LocalizedUserData>({
  key: "Userdata",
  default: {
    uid: "",
    name: "",
    iconUrl: "",
    classID: "",
    className: ""
  }
})