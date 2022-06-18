import { atom } from "recoil"

interface Threads {
	id: string,
	title: string,
	lastUpdate: number
}

export const ThreadTitlesAtom = atom<Threads[]>({
	key: "Threads",
	default: []
})