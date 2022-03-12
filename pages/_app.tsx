import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { SocketContext, socket } from '../contexts/SocketIO'

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider>
			<SocketContext.Provider value={socket}>
				<Component {...pageProps} />
			</SocketContext.Provider>
		</ChakraProvider>
	)
}

export default MyApp
