import { useEffect } from "react"
import "../styles/globals.css"
import "animate.css"
import Head from "next/head"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { SocketContext, socket } from "../contexts/SocketIO"
import "focus-visible/dist/focus-visible" //キーボード操作によるフォーカス以外は要素のアウトラインを表示しない

const MyApp = ({ Component, pageProps }: AppProps) => {
	//LocalStorage 初期化
	useEffect(() => {
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
