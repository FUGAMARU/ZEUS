//Chakra UI Components
import { Flex, Tooltip, Text } from "@chakra-ui/react"

interface Props {
	title: string,
	lastUpdate: string
}

const BBSStackItem = (props: Props) => {
	return(
		<Flex alignItems="center" minH={5}>
			<Tooltip label={props.title}>
				<Text className="kr tpl" fontSize={14} ml={3} display="inline-block" maxW={{base: "16rem", md: "17rem", lg: "19rem"}} cursor="pointer"_hover={{color: "#536bac"}}>{props.title}</Text>
			</Tooltip>
			<Text fontSize={{base: "0.7rem", md: "0.7rem", lg: "0.5rem"}} ml={2} color="gray.400">{props.lastUpdate}</Text>
		</Flex>
	)
}

export default BBSStackItem