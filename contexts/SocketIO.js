import { createContext } from "react"
import { io } from "socket.io-client"

export const socket = io("http://localhost:8080")
export const SocketContext = createContext()
