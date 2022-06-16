//Custom Hooks
import { useTouchDevice } from "../hooks/useTouchDevice"

//Chakra UI Components
import { Box, Text, Flex, Tooltip, Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton } from '@chakra-ui/react'

//Custom Components
import BBSPopover from "./BBSPopover"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

interface Props {
	title: string,
	gradientStartHex: string,
	gradientEndHex: string,
	childComponent: JSX.Element,
	UID?: string
}

const FunctionCard = (props: Props) => {
	const isTouchDevice = useTouchDevice()

	return(
		<Box bg="white" shadow="xl" borderRadius={15} py={4} transition="0.4s all ease-out" _hover={!isTouchDevice ? {transform: "scale(1.05, 1.05)"} : {}}>
			<Flex justifyContent="space-between" alignItems="center" mx={5}>
				<Text className="rmb" color="#2b2b2b" fontSize={23}>{props.title}</Text>
				{props.title === "BBS" ? 
					<BBSPopover UID={props.UID} />
				: props.title === "お知らせ" ?
				<Popover>
					<PopoverTrigger>
						<Box>
							<Tooltip label="トピックを作成" isDisabled={isTouchDevice ? true: false}>
								<Box fontSize="1.3rem" color="#474747" cursor="pointer"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Box>
							</Tooltip>
						</Box>
					</PopoverTrigger>
					<PopoverContent borderRadius={5} p={3}>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverBody>
							トピック追加画面
							{/*Modalの方が良いかも？？？ Todo: 太字や色付けなど文字修飾できるように*/}
						</PopoverBody>
					</PopoverContent>
				</Popover>
				: null}
			</Flex>
			<Box h={1} w="80%" mb={3} bgGradient={`linear(to-r, ${props.gradientStartHex}, ${props.gradientEndHex})`} borderRightRadius={10}></Box>
			{props.childComponent}
		</Box>
	)
}

export default FunctionCard