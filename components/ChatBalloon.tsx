//Chakra UI Components
import { Box, Flex, Avatar, Text } from "@chakra-ui/react"

//CSS Modules
import styles from "../styles/ChatBalloon.module.css"

interface Props {
	type: string,
	message: string,
	time: string,
	userName?: string,
	profileIconSrc?: string,
}

const ChatBalloon = (props: Props) => {
	if(props.type === "me"){
		return(
			<Flex justifyContent="flex-end">
				<Box position="relative">
					<Text fontSize="0.6rem" fontWeight="300" color="white" mb={3} position="absolute" bottom={0} left={-6}>{props.time}</Text>
				</Box>
				<Box className={styles.me} maxW="80%">{props.message}</Box>	
			</Flex>
		)
	}else if(props.type === "other"){
		return (
			<Flex pl={3}>
				<Avatar src={props.profileIconSrc} size="sm"></Avatar>
				<Box maxW="75%">
					<Text color="white" fontSize="0.6rem" fontWeight="300" ml={2}>{props.userName}</Text>
					<Box className={styles.other}>{props.message}</Box>
				</Box>
				<Box position="relative">
					<Text color="white" fontSize="0.6rem" fontWeight="300" mb={3} position="absolute" bottom={0}>{props.time}</Text>
				</Box>
			</Flex>
		)
	}else{
		return null
	}
}

export default ChatBalloon