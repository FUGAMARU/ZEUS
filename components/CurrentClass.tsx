//React Hooks
import { useState, useEffect } from "react"

//Next.js Components
import Image from "next/image"

//Chakra UI Components
import { Box, Text, Flex, Button } from "@chakra-ui/react"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChalkboardUser, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { getLectureData } from "../firebase"

//Useful Functions
import { whattimeIsIt, getRemainingTime, getTimestamp } from "../functions"

//Global State Management
import { useRecoilValue } from "recoil"
import { UserdataAtom } from "../atoms/UserdataAtom"

interface Props {
	UNIXTime: number,
	updateFlag: boolean
}

const CurrentClass = (props: Props) => {
	const userdata = useRecoilValue(UserdataAtom)
	//カードに表示するデーター
	const [lectureData, setLectureData] = useState({
		name: "取得中…",
		hours: "取得中…",
		location: "取得中…",
		teacher: "取得中",
		classroomLink: "https://classroom.google.com/",
		zoomLink: "https://zoom.us/"
	})
	const [percentage, setPercentage] = useState(0)
	const [remainingTime, setRemainingTime] = useState("-")
	const [isInSession, setInSession] = useState(false) //授業が開講中かどうか
	const [lastUpdate, setLastUpdate] = useState(0) //判定時間の1分間で毎秒Firebaseにデーター取りに行かないようにするための判定用state

	useEffect(() => {
		//残り時間を計算・表示する
		const receivedRemainingTime = getRemainingTime(props.UNIXTime, "current")
		if(receivedRemainingTime === null || !!!isInSession){ //授業時間外の場合
			setPercentage(0)
			setRemainingTime("-")
		}else{
			setPercentage(100 - Math.round(receivedRemainingTime / 45 * 100))
			setRemainingTime(String(receivedRemainingTime))
		}

		//授業開始・終了時間に授業情報の取得を行う
		const timings = [930, 1015, 1100, 1110, 1155, 1240, 1330, 1415, 1500, 1510, 1555, 1640]
		const timestamp = getTimestamp(props.UNIXTime)
		if(timings.includes(timestamp) && timestamp !== lastUpdate){
			setLastUpdate(timestamp)
			settingLectureData()
		}
	}, [props.UNIXTime])

	//コンポーネントがロードされた時と、index.tsxのSWRが時刻取得できたタイミングで授業情報を取ってくる
	useEffect(() => {
		console.log("=== UpdateFlag Executed! ===")
		settingLectureData()
	}, [props.updateFlag])

	//Firebaseからデーターを引っ張ってきてstateにセットする
	const settingLectureData = async() => {
		const res = await getLectureData("current", userdata.uid, props.UNIXTime)
		console.log("==========現在の授業情報==========")
		console.log(res)
		if(typeof res === "string"){
			setLectureData({
				name: "現在の授業はありません",
				hours: "ㅤㅤㅤㅤㅤㅤㅤ",
				location: "ㅤㅤㅤㅤㅤㅤㅤ",
				teacher: "ㅤㅤㅤㅤㅤㅤㅤ",
				classroomLink: "https://classroom.google.com/",
				zoomLink: "https://zoom.us/"
			})
			setInSession(false)
		}else{
			setLectureData({
				name: res.name,
				hours: res.hours,
				location: res.location,
				teacher: res.teacher,
				classroomLink: res.classroom,
				zoomLink: res.zoom
			})
			setInSession(true)
		}
	}

	return(
		<Box>
			<Flex justifyContent="space-around" alignItems="center">
				<Box px={2}>
					<Box h={130} w={130}>
						<CircularProgressbarWithChildren value={percentage} styles={buildStyles({
							pathColor: "#dae93f",
							trailColor: "#ededed"
						})}>
							<Text className="kr" fontSize={13}>残り</Text>
							<Text className="kb" fontSize={20}>{remainingTime}分</Text>
						</CircularProgressbarWithChildren>
					</Box>
				</Box>
				<Box px={2}>
					<Text className="ksb" textAlign="center" bg="#dae928" fontSize="0.7rem" mb="0.5rem" w="100%" h="0.9rem">{isInSession ? `${whattimeIsIt(props.UNIXTime, "current")}時限目` : ""}</Text>
					<Text className="kb" textAlign="center">{lectureData.name}</Text>
					<hr className="class-hr"/>
					<Flex justifyContent="center" alignItems="center">
						<FontAwesomeIcon icon={faClock} color="#4a4848" style={{height: "0.8rem"}} /><Text className="kr" textAlign="center" fontSize={13} ml={1.5} >{lectureData.hours}</Text>
					</Flex>
					<Flex justifyContent="center" alignItems="center">
						<FontAwesomeIcon icon={faLocationDot} color="#4a4848" style={{height: "0.8rem"}} /><Text className="kr" textAlign="center" fontSize={13} ml={1.5} >{lectureData.location}</Text>
					</Flex>
					<Flex justifyContent="center" alignItems="center">
						<FontAwesomeIcon icon={faChalkboardUser} color="#4a4848" style={{height: "0.8rem"}} /><Text className="kr" textAlign="center" fontSize={13} ml={1.5} >{lectureData.teacher}</Text>
					</Flex>
				</Box>
			</Flex>
			<Flex mt={4} justifyContent="space-around">
				<Button variant="outline" size="sm" colorScheme="green" leftIcon={<Image src="/classroom.svg" width={20} height={17}></Image>}>
					<a href={lectureData.classroomLink} target="_blank" rel="noopener noreferrer">Classroomを開く</a>
				</Button>
				<Button variant="outline" size="sm" colorScheme="blue" leftIcon={<Image src="/zoom.svg" width={22} height={22}></Image>}>
				<a href={lectureData.zoomLink} target="_blank" rel="noopener noreferrer">Zoomに参加する</a>
				</Button>
			</Flex>
		</Box>
	)
}

export default CurrentClass