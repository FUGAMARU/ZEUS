import { atom } from "recoil"
import { ThreadHeadings } from "../Interfaces"

export const ThreadHeadingsAtom = atom<ThreadHeadings[]>({
  key: "ThreadHeadings",
  default: []
})