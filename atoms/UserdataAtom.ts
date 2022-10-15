import { atom } from "recoil"
import { Userdata } from "../Interfaces"

export const UserdataAtom = atom<Userdata>({
  key: "Userdata",
  default: {
    uid: "",
    name: "",
    iconUrl: "",
    classID: "",
    className: ""
  }
})