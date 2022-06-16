import { atom } from "recoil"

export const ThreadTitlesAtom = atom<string[][]>({
	key: "Threads",
	default: []
})