//Custom Hooks
import { useTouchDevice } from "../hooks/useTouchDevice"

//Chakra UI Components
import { Box, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, Tooltip } from "@chakra-ui/react"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const InformationPopover = () => {
	const isTouchDevice = useTouchDevice()

	return(
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
	)
}

export default InformationPopover