//Custom Hooks
import { useTouchDevice } from '../hooks/useTouchDevice'

//Chakra UI Components
import { Box, Text } from '@chakra-ui/react'

interface Props {
	title: string,
	gradientStartHex: string,
	gradientEndHex: string,
	childComponent: JSX.Element
}

const FunctionCard = (props: Props) => {
	const isTouchDevice = useTouchDevice()

	return(
		<Box bg="white" shadow="xl" borderRadius={15} py={4} transition="0.4s all ease-out" _hover={!isTouchDevice ? {transform: "scale(1.05, 1.05)"} : {}}>
			<Text className="rmb" color="#2b2b2b" fontSize={23} ml={5}>{props.title}</Text>
			<Box h={1} w="80%" mb={3} bgGradient={`linear(to-r, ${props.gradientStartHex}, ${props.gradientEndHex})`} borderRightRadius={10}></Box>
			{props.childComponent}
		</Box>
	)
}

export default FunctionCard