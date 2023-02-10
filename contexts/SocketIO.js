import { createContext } from "react"
import { io } from "socket.io-client"

export const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_ADDRESS, {
  path: process.env.NEXT_PUBLIC_WEBSOCKET_PATH
})
export const SocketContext = createContext()