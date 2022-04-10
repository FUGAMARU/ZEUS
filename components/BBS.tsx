//React Hooks
import { useState } from "react"

//Chakra UI Components
import { Box, VStack, StackDivider } from "@chakra-ui/react"

//Custom Components
import ThreadListHeading from "./ThreadListHeading"
import Thread from "./Thread"

//Libraries
import "animate.css"

const BBS = () => {
	const [listClasses, setListClasses] = useState("")
	const [threadClasses, setThreadClasses] = useState("")
	const [displayFlag, setdisplayFlag] = useState(false)
	const [threadTitle, setThreadTitle] = useState("")

	const openThread = (title: string) => {
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

				<Box onClick={() => openThread("元葬儀屋のワイが神奈川県警の悪事を淡々と話すスレ")}>
					<ThreadListHeading title="元葬儀屋のワイが神奈川県警の悪事を淡々と話すスレ" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => openThread("ゲーセンで出会った不思議な子の話")}>
					<ThreadListHeading title="ゲーセンで出会った不思議な子の話" lastUpdate="3分前"/>
				</Box>

				<Box onClick={() => openThread("もう時効だから話す")}>
					<ThreadListHeading title="もう時効だから話す" lastUpdate="32分前"/>
				</Box>

				<Box onClick={() => openThread("うまい棒配ってたら人生変わったでござるの巻")}>
					<ThreadListHeading title="うまい棒配ってたら人生変わったでござるの巻" lastUpdate="2時間前"/>
				</Box>

				<Box onClick={() => openThread("モスバーガーのきれいな食い方教えれ")}>
					<ThreadListHeading title="モスバーガーのきれいな食い方教えれ" lastUpdate="1日前"/>
				</Box>

				<Box onClick={() => openThread("東京に5万隠した、見つけられるかな？？")}>
					<ThreadListHeading title="東京に5万隠した、見つけられるかな？？" lastUpdate="15日前"/>
				</Box>

				<Box onClick={() => openThread("おまいら、俺のアパートが祭りかもしれん")}>
					<ThreadListHeading title="おまいら、俺のアパートが祭りかもしれん" lastUpdate="28日前"/>
				</Box>

				<Box onClick={() => openThread("信じられないかもしれないが変な体験した")}>
					<ThreadListHeading title="信じられないかもしれないが変な体験した" lastUpdate="3ヶ月前"/>
				</Box>

				<Box onClick={() => openThread("去年のGWでの一人旅でのお話")}>
					<ThreadListHeading title="去年のGWでの一人旅でのお話" lastUpdate="1年以上前"/>
				</Box>

				<Box onClick={() => openThread("元葬儀屋のワイが神奈川県警の悪事を淡々と話すスレ")}>
					<ThreadListHeading title="元葬儀屋のワイが神奈川県警の悪事を淡々と話すスレ" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => openThread("ゲーセンで出会った不思議な子の話")}>
					<ThreadListHeading title="ゲーセンで出会った不思議な子の話" lastUpdate="3分前"/>
				</Box>

				<Box onClick={() => openThread("もう時効だから話す")}>
					<ThreadListHeading title="もう時効だから話す" lastUpdate="32分前"/>
				</Box>

				<Box onClick={() => openThread("うまい棒配ってたら人生変わったでござるの巻")}>
					<ThreadListHeading title="うまい棒配ってたら人生変わったでござるの巻" lastUpdate="2時間前"/>
				</Box>

				<Box onClick={() => openThread("モスバーガーのきれいな食い方教えれ")}>
					<ThreadListHeading title="モスバーガーのきれいな食い方教えれ" lastUpdate="1日前"/>
				</Box>

				<Box onClick={() => openThread("東京に5万隠した、見つけられるかな？？")}>
					<ThreadListHeading title="東京に5万隠した、見つけられるかな？？" lastUpdate="15日前"/>
				</Box>

				<Box onClick={() => openThread("おまいら、俺のアパートが祭りかもしれん")}>
					<ThreadListHeading title="おまいら、俺のアパートが祭りかもしれん" lastUpdate="28日前"/>
				</Box>

				<Box onClick={() => openThread("信じられないかもしれないが変な体験した")}>
					<ThreadListHeading title="信じられないかもしれないが変な体験した" lastUpdate="3ヶ月前"/>
				</Box>

				<Box onClick={() => openThread("去年のGWでの一人旅でのお話")}>
					<ThreadListHeading title="去年のGWでの一人旅でのお話" lastUpdate="1年以上前"/>
				</Box>

			</VStack>

			<Box className={threadClasses} style={displayFlag ? {} : {display: "none"}}>
				<Thread backToList={backToList} title={threadTitle}/>
			</Box>
		</Box>
	)
}

export default BBS