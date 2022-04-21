//Next.js Components
import Image from "next/image"

//Chakra UI Components
import { Flex, Text } from "@chakra-ui/react"

const Loading = () => {
	return (
		<Flex minHeight="100vh" bg="#f0f0f0" justifyContent="center" alignItems="center" flexFlow="column">
			<Image src="/loading.svg" width={150} height={33} />
			<Text className="sbei blink" fontSize="1.5rem" textAlign="center">Loading...!</Text>				
		</Flex>
	)
}

export default Loading