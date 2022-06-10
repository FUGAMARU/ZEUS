//React Hooks
import { useEffect } from "react"

//Next.js Components
import Head from "next/head"

//Next.js Types
import type { AppProps } from "next/app"

//Styling
import "../styles/globals.css"
import "animate.css"

//Libraries
import { ChakraProvider } from "@chakra-ui/react"
import { SocketContext, socket } from "../contexts/SocketIO"
import "focus-visible/dist/focus-visible" //キーボード操作によるフォーカス以外は要素のアウトラインを表示しない

const MyApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		//LocalStorageの初期化
		if(!(localStorage.hasOwnProperty("weatherLocation"))){
			localStorage["weatherLocation"] = "tokyo"
		}
	}, [])

	return (
		<>
			<Head>
				<title>ZEUS</title>	
				<meta httpEquiv="content-language" content="ja"></meta>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<ChakraProvider>
				<SocketContext.Provider value={socket}>
					<Component {...pageProps} />
				</SocketContext.Provider>
			</ChakraProvider>
		</>
	)
}

export default MyApp
