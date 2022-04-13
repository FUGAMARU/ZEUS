import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { SocketContext, socket } from "../contexts/SocketIO"
import "focus-visible/dist/focus-visible" //キーボード操作によるフォーカス以外は要素のアウトラインを表示しない
import { useEffect } from "react"

const MyApp = ({ Component, pageProps }: AppProps) => {

	//LocalStorage 初期化
	useEffect(() => {
		if(!(localStorage.hasOwnProperty("weatherLocation"))){
			localStorage["weatherLocation"] = "tokyo"
		}
	}, [])

	return (
		<ChakraProvider>
			<SocketContext.Provider value={socket}>
				<Component {...pageProps} />
			</SocketContext.Provider>
		</ChakraProvider>
	)
}

export default MyApp
