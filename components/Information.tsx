//React Hooks
import { useState } from "react"

//Chakra UI Components
import { Box, VStack, StackDivider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Text } from "@chakra-ui/react"

//Custom Components
import ListHeading from "./ListHeading"

const Information = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [modalHeader, setModalHeader] = useState("")
	const [modalBody, setModalBody] = useState("")

	return(
		<Box mx={2} overflowX="hidden">
			<VStack align="stretch" divider={<StackDivider borderColor="gray.200"/>} overflowY="auto" maxH={{base: 400, md:460, lg: 500}}>

				<Box onClick={() => {
					setModalHeader("基本情報等検定試験申込報告")
					setModalBody("基本情報技術者試験、応用情報技術者試験、ITパスポート試験ほか\n検定試験の申込を行った際に、以下のURLから報告をお願いします。\n\nhttps://forms.gle/5UWy7K933kEiE92i5")
					onOpen()
				}}>
					<ListHeading title="基本情報等検定試験申込報告" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>
				
				<Box onClick={() => {
					setModalHeader("個人面談及び模擬面接スケジュール（2/15～17の模擬面接欠席者）")
					setModalBody("個人面談はオンラインで実施します。\n\nZoom ID等は後日連絡いたします。\n\n2/15～17に集団模擬面接を欠席している方は、\n模擬面接を実施しますので必ず参加してください。\n当日はJ検プログラミングスキルを10:00から実施します。\nプログラミングスキル試験終了後、休憩をとり13:15に研B-0604教室に集合。")
					onOpen()
				}}>
					<ListHeading title="個人面談及び模擬面接スケジュール（2/15～17の模擬面接欠席者）" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("卒業展2022　ITカレッジサイト")
					setModalBody("ITカレッジの卒業展サイトです。\n2/25～27で見学できなかった方はご覧ください。\n\n\nhttps://hacneec.sakura.ne.jp/xxxxxxxxxx/")
					onOpen()
				}}>
					<ListHeading title="卒業展2022　ITカレッジサイト" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("在校生のみなさまへ")
					setModalBody("日本工学院法人本部のコミュニケーション企画部より\n在校生のみなさんに「学生生活調査」へのご協力のお願いです。\n\nこのアンケートは、毎年この時期に実施をしているもので、ご回答いただいた内容は、今後の教育の質向上と学生生活の改善に役立てて参りますので、是非ご協力をお願いいたします。\nアンケート結果は「〇〇は△△％」のような形で集計し、また無記名ですので個人が特定されることはありません。\n回答にかかる時間は10分程度です。\n下記のURLから回答をお願いいたします。\n\n\nアンケート用URL：https://questant.jp/q/xxxxxxxxxx\n\n\n\n回答期限：２０２２年１月２５日（火）まで\n\nご協力のほど、よろしくお願いいたします。")
					onOpen()
				}}>
					<ListHeading title="在校生のみなさまへ" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("e-FESTA登録料　及び　第４回基本情報技術者試験　午前免除試験料　の返金に関して")
					setModalBody("１月２１日（金）健康診断終了後、研B-0604教室にて上記の登録料・受験料を返金します。\n忘れずに「はんこ」を持参してください。\n領収証をに押印して頂きます。\n\ne-FESTA登録料3,990円は全員\n午前免除試験料2,000円は受験資格がない方と３回の免除試験合格の方です。")
					onOpen()
				}}>
					<ListHeading title="e-FESTA登録料　及び　第４回基本情報技術者試験　午前免除試験料　の返金に関して" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("１月１７日（月）以降の時間割")
					setModalBody("１月１４日現在の予定ですので、変更があり得ることをご承知おきください。\n各自確認してください。\n成績発表時に再評価科目がある方は、再評価手続きも行いますので、準備をしておいてください。")
					onOpen()
				}}>
					<ListHeading title="１月１７日（月）以降の時間割" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("＜健康診断についての詳細＞")
					setModalBody("1月21日(金)　9:40~10:10の時間帯で実施します。\n健診会場：本部棟１F　イベントスペース\n\n★9:20集合（健診会場前）\n点呼の際、受診票をお渡ししますので、受診前に問診事項を回答してください。\n添付の実施要領と問診内容を確認しておいてください。")
					onOpen()
				}}>
					<ListHeading title="＜健康診断についての詳細＞" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("＜健康診断日程が確定しました＞")
					setModalBody("1月21日(金)　9:40~10:10の時間帯で実施します。\n健診会場：本部棟１Fイベントスペース\n\n\n健康診断は法律によって定められていますので、必ず受診してください。\n健康診断の詳細は別途連絡します\n受診に際して、費用は掛かりません。\n\n就職活動に使用できる健康診断書となります。\n検診結果に問題がない場合は、学校の証紙発券機より健康診断書が受取れます。\n健康診断書の発行は400円となります。")
					onOpen()
				}}>
					<ListHeading title="＜健康診断日程が確定しました＞" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("基本情報等検定試験申込報告")
					setModalBody("基本情報技術者試験、応用情報技術者試験、ITパスポート試験ほか\n検定試験の申込を行った際に、以下のURLから報告をお願いします。\n\nhttps://forms.gle/5UWy7K933kEiE92i5")
					onOpen()
				}}>
					<ListHeading title="基本情報等検定試験申込報告" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>
				
				<Box onClick={() => {
					setModalHeader("個人面談及び模擬面接スケジュール（2/15～17の模擬面接欠席者）")
					setModalBody("個人面談はオンラインで実施します。\n\nZoom ID等は後日連絡いたします。\n\n2/15～17に集団模擬面接を欠席している方は、\n模擬面接を実施しますので必ず参加してください。\n当日はJ検プログラミングスキルを10:00から実施します。\nプログラミングスキル試験終了後、休憩をとり13:15に研B-0604教室に集合。")
					onOpen()
				}}>
					<ListHeading title="個人面談及び模擬面接スケジュール（2/15～17の模擬面接欠席者）" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("卒業展2022　ITカレッジサイト")
					setModalBody("ITカレッジの卒業展サイトです。\n2/25～27で見学できなかった方はご覧ください。\n\n\nhttps://hacneec.sakura.ne.jp/xxxxxxxxxx/")
					onOpen()
				}}>
					<ListHeading title="卒業展2022　ITカレッジサイト" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("在校生のみなさまへ")
					setModalBody("日本工学院法人本部のコミュニケーション企画部より\n在校生のみなさんに「学生生活調査」へのご協力のお願いです。\n\nこのアンケートは、毎年この時期に実施をしているもので、ご回答いただいた内容は、今後の教育の質向上と学生生活の改善に役立てて参りますので、是非ご協力をお願いいたします。\nアンケート結果は「〇〇は△△％」のような形で集計し、また無記名ですので個人が特定されることはありません。\n回答にかかる時間は10分程度です。\n下記のURLから回答をお願いいたします。\n\n\nアンケート用URL：https://questant.jp/q/xxxxxxxxxx\n\n\n\n回答期限：２０２２年１月２５日（火）まで\n\nご協力のほど、よろしくお願いいたします。")
					onOpen()
				}}>
					<ListHeading title="在校生のみなさまへ" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("e-FESTA登録料　及び　第４回基本情報技術者試験　午前免除試験料　の返金に関して")
					setModalBody("１月２１日（金）健康診断終了後、研B-0604教室にて上記の登録料・受験料を返金します。\n忘れずに「はんこ」を持参してください。\n領収証をに押印して頂きます。\n\ne-FESTA登録料3,990円は全員\n午前免除試験料2,000円は受験資格がない方と３回の免除試験合格の方です。")
					onOpen()
				}}>
					<ListHeading title="e-FESTA登録料　及び　第４回基本情報技術者試験　午前免除試験料　の返金に関して" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("１月１７日（月）以降の時間割")
					setModalBody("１月１４日現在の予定ですので、変更があり得ることをご承知おきください。\n各自確認してください。\n成績発表時に再評価科目がある方は、再評価手続きも行いますので、準備をしておいてください。")
					onOpen()
				}}>
					<ListHeading title="１月１７日（月）以降の時間割" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("＜健康診断についての詳細＞")
					setModalBody("1月21日(金)　9:40~10:10の時間帯で実施します。\n健診会場：本部棟１F　イベントスペース\n\n★9:20集合（健診会場前）\n点呼の際、受診票をお渡ししますので、受診前に問診事項を回答してください。\n添付の実施要領と問診内容を確認しておいてください。")
					onOpen()
				}}>
					<ListHeading title="＜健康診断についての詳細＞" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

				<Box onClick={() => {
					setModalHeader("＜健康診断日程が確定しました＞")
					setModalBody("1月21日(金)　9:40~10:10の時間帯で実施します。\n健診会場：本部棟１Fイベントスペース\n\n\n健康診断は法律によって定められていますので、必ず受診してください。\n健康診断の詳細は別途連絡します\n受診に際して、費用は掛かりません。\n\n就職活動に使用できる健康診断書となります。\n検診結果に問題がない場合は、学校の証紙発券機より健康診断書が受取れます。\n健康診断書の発行は400円となります。")
					onOpen()
				}}>
					<ListHeading title="＜健康診断日程が確定しました＞" lastUpdate="1分以内"/> {/*1分以内、○分前、○時間前、○日前、○ヶ月前、1年以上前*/}
				</Box>

			</VStack>

			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader><Text className="kb">{modalHeader}</Text></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text className="kr" whiteSpace="pre-line">{modalBody}</Text>
					</ModalBody>
				</ModalContent>
			</Modal>

		</Box>
	)
}

export default Information