//React Hooks
import { useState, useEffect } from "react"

//Custom Hooks
import useUNIXTime from "../hooks/useUNIXTime"

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

interface Props {
	UID: string
}

const CurrentClass = (props: Props) => {
	const { localUNIXTime } = useUNIXTime()
	const [UNIXTimeFlag, setUNIXTimeFlag] = useState(false) //UNIXTimeを正常に取得できたかどうか
	const [isNowNull, setNowNull] = useState(true) //現在の時間帯授業が未設定かどうか(授業IDがnullであったかどうか)

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
	const [remainingTime, setRemainingTime] = useState("0")
	const [hourLabel, setHourLabel] = useState("取得中…")	

	useEffect(() => {
			if(localUNIXTime !== 0){
				const timings = [930, 1015, 1100, 1110, 1155, 1240, 1330, 1415, 1500, 1510, 1555, 1640]
				if(!!!UNIXTimeFlag || timings.includes(getTimestamp(localUNIXTime))){ //コンポーネント読み込み時または授業開始・終了時間に処理を行う
					setUNIXTimeFlag(true)
					getAndSetLectureData()
				}

				if(!!!isNowNull){				
					const receivedRemainingTime = getRemainingTime(localUNIXTime, "current")
					if(receivedRemainingTime === null){ //授業時間外の場合
						setPercentage(0)
						setRemainingTime("")
					}else{
						setPercentage(100 - Math.round(receivedRemainingTime / 45 * 100))
						setRemainingTime(String(receivedRemainingTime))
					}
				}
			}

			if(!!!UNIXTimeFlag){
				document.addEventListener("visibilitychange", () => {
					if(document.visibilityState === "visible"){
						setTimeout(() => {
							console.log("タブが復帰しました")
							getAndSetLectureData()
						}, 1000) //useSWRが時刻データーを引っ張ってくるのにかかる時間を考慮して復帰1秒後にFirestoreにリクエストを送る
					}
				})
			}
	}, [localUNIXTime])

	const getAndSetLectureData = async () => {
		if(localUNIXTime !== 0){
			const res = await getLectureData("current", props.UID, localUNIXTime)
			console.log("==========現在の授業情報==========")
			console.log(res)
			if(res === ""){
				setLectureData({
					name: "現在の授業はありません",
					hours: "ㅤㅤㅤㅤㅤㅤㅤ",
					location: "ㅤㅤㅤㅤㅤㅤㅤ",
					teacher: "ㅤㅤㅤㅤㅤㅤㅤ",
					classroomLink: "https://classroom.google.com/",
					zoomLink: "https://zoom.us/"
				})
				setHourLabel("")
				setNowNull(true)
			}else{
				setLectureData({
					name: res.name,
					hours: res.hours,
					location: res.location,
					teacher: res.teacher,
					classroomLink: res.classroom,
					zoomLink: res.zoom
				})
				setHourLabel(String(whattimeIsIt(localUNIXTime, "current") + "時限目"))
				setNowNull(false)
			}
		}else{
			console.log("Local Unix Time is ZERO")
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
					<Text className="ksb" textAlign="center" bg="#dae928" fontSize="0.7rem" mb="0.5rem" w="100%" h="0.9rem">{hourLabel}</Text>
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