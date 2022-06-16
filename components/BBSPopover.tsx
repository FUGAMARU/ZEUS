//React Hooks
import { useRef, useState } from "react"

//Custom Hooks
import { useTouchDevice } from "../hooks/useTouchDevice"

//Chakra UI Components
import { Box, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, Tooltip, Text, Input, Button } from "@chakra-ui/react"

//Libraries
import { createBBSThread } from "../firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useRecoilState, useRecoilValue } from "recoil"
import { RecoilUNIXTime } from "../atoms/UNXITimeAtom"
import { ThreadTitlesAtom } from "../atoms/ThreadTitlesAtom"

interface Props {
    UID: string | undefined
}

const BBSPopover = (props: Props) => {
    const isTouchDevice = useTouchDevice()
    const inputRef = useRef<HTMLInputElement>(null)
	const recoilUNIXTime = useRecoilValue(RecoilUNIXTime)
	const [threadTitles, pushThreadTitles] = useRecoilState(ThreadTitlesAtom)
	const [isOpen, setOpen] = useState<boolean>() //Popoverが開いているかどうか

	const handleButtonClick = async () => {
		if(props.UID && inputRef.current?.value){
			console.log("Requested to create new BBS thread with the informations")
			console.log(props.UID, inputRef.current.value, recoilUNIXTime)
			const createdTitle = await createBBSThread(props.UID, inputRef.current.value, recoilUNIXTime)
			console.log("書き込み完了！")
			pushThreadTitles([createdTitle, ...threadTitles])
			setOpen(false)
		}
	}

    return(
		<Popover closeOnBlur={false} isOpen={isOpen} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
			<PopoverTrigger>
				<Box>
					<Tooltip label="スレッドを作成" isDisabled={isTouchDevice ? true: false}>
						<Box fontSize="1.3rem" color="#474747" cursor="pointer"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Box>
					</Tooltip>
				</Box>
			</PopoverTrigger>
			<PopoverContent borderRadius={5} p={2}>
				<PopoverHeader>
					<Text className="ksb" fontSize="0.9rem" textAlign="center">スレッド作成</Text>
				</PopoverHeader>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverBody textAlign="center">
					<Input placeholder="スレッドタイトルを入力…" size="sm" borderRadius={5} mt={2} textAlign="center" ref={inputRef} />
					<Button size="xs" w="100%" mt={2} colorScheme="blue" onClick={handleButtonClick}>作成する</Button>
				</PopoverBody>
			</PopoverContent>
		</Popover>
    )
}

export default BBSPopover