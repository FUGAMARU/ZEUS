import { atom } from "recoil"

interface Userdata {
	uid: string,
	name: string,
	iconUrl: string,
	classID: string,
	className: string
}

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