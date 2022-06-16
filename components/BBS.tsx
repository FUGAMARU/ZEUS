//React Hooks
import { useEffect, useState } from "react"

//Chakra UI Components
import { Box, VStack, StackDivider } from "@chakra-ui/react"

//Custom Components
import ListHeading from "./ListHeading"
import Thread from "./Thread"

//Libraries
import { getThreads } from "../firebase"
import { useRecoilState } from "recoil"
import { ThreadTitlesAtom } from "../atoms/ThreadTitlesAtom"

const BBS = () => {
	const [threadTitles, setThreadTitles] = useRecoilState(ThreadTitlesAtom)
	const [openedID, setOpenedID] = useState("") //スレッドリストから開かれたスレッドのID

	useEffect(() => {
		(async() => {
			const res = await getThreads(0)
			setThreadTitles(res)
		})()
	}, [])

	//画面遷移アニメーション関連
	const [listClasses, setListClasses] = useState("")
	const [threadClasses, setThreadClasses] = useState("")
	const [displayFlag, setdisplayFlag] = useState(false)
	const [threadTitle, setThreadTitle] = useState("")

	const openThread = (title: string): void => {
		setThreadTitle(title)
		setListClasses("animate__animated animate__fadeOutLeft")
		setTimeout(() => {
			setdisplayFlag(!displayFlag)
			setThreadClasses("animate__animated animate__fadeInRight")
		}, 500)
	}

	const backToList = () => {
		setThreadClasses("animate__animated animate__fadeOutRight")
		setTimeout(() => {
			setdisplayFlag(!displayFlag)
			setListClasses("animate__animated animate__fadeInLeft")
		}, 500)
	}

	return(
		<Box mx={2} overflowX="hidden">
			<VStack className={listClasses} style={displayFlag ? {display: "none"} : {}} align="stretch" divider={<StackDivider borderColor="gray.200"/>} overflowY="auto" maxH={{base: 400, md:460, lg: 500}}>
				{threadTitles.map((v, k) => {
					return(
						<Box key={k} onClick={() => { openThread(v[1]); setOpenedID(v[0]) }}>
							<ListHeading title={v[1]} lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
						</Box>
					)
				})}
			</VStack>
			
			
			<Box className={threadClasses} style={displayFlag ? {} : {display: "none"}}>
				<Thread backToList={backToList} title={threadTitle} id={openedID} />
			</Box>
	
		</Box>
	)
}

export default BBS