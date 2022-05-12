//React Hooks
import { useState, useEffect } from "react"

//Custom Hooks
import useUNIXTime from "../hooks/useUNIXTime"

//Next.js Components
import Image from "next/image"

//Chakra UI Components
import { Box, Text, Flex, Button, Center } from "@chakra-ui/react"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChalkboardUser, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { getLectureData } from "../firebase"

//Useful Functions
import { getTimestamp, whattimeIsIt, getRemainingTime } from "../functions"

interface Props {
	UID: string
}

const NextClass = (props: Props) => {
	const { localUNIXTime } = useUNIXTime()
	const [UNIXTimeFlag, setUNIXTimeFlag] = useState(false) //UNIXTimeを正常に取得できたかどうか
	const [isNowNull, setNowNull] = useState(true) //現在の時間帯授業が未設定かどうか(授業IDがnullであったかどうか)
	
	//カードに表示するデーター
	const [lectureData, setLectureData] = useState({
		name: "取得中…",
		hours: "取得中…",
		location: "取得中…",
		teacher: "取得中",
		classroomLink: "https://classroom.google.com/"
	})
	const [percentage, setPercentage] = useState(0)
	const [remainingTime, setRemainingTime] = useState("0")
	const [hourLabel, setHourLabel] = useState("取得中…")

	useEffect(() => {
		(async() => {
			if(localUNIXTime !== 0){
				const timings = [830, 930, 1015, 1110, 1155, 1330, 1415, 1510, 1555]
				if(!!!UNIXTimeFlag || timings.includes(getTimestamp(localUNIXTime))){ //コンポーネント読み込み時または授業開始・終了時間に処理を行う
					setUNIXTimeFlag(true)
					const res = await getLectureData("next", props.UID, localUNIXTime)
					console.log("==========次の授業情報==========")
					console.log(res)
					if(res === ""){
						setLectureData({
							name: "次の授業はありません",
							hours: "ㅤㅤㅤㅤㅤㅤㅤ",
							location: "ㅤㅤㅤㅤㅤㅤㅤ",
							teacher: "ㅤㅤㅤㅤㅤㅤㅤ",
							classroomLink: "https://classroom.google.com/"
						})
						setHourLabel("")
						setNowNull(true)
					}else{
						setLectureData({
							name: res.name,
							hours: res.hours,
							location: res.location,
							teacher: res.teacher,
							classroomLink: res.classroom
						})
						setHourLabel(String(whattimeIsIt(localUNIXTime, "next") + 1) + "時限目")
						setNowNull(false)
					}
				}

				if(!!!isNowNull){				
					const receivedRemainingTime = getRemainingTime(localUNIXTime, "next")
					if(receivedRemainingTime === null){ //授業時間外の場合
						setPercentage(0)
						setRemainingTime("")
					}else{
						setPercentage(Math.round(receivedRemainingTime / 45 * 100))
						setRemainingTime(String(receivedRemainingTime))
					}
				}
			}
		})()
	}, [localUNIXTime])

	return(
		<Box>
			<Flex justifyContent="space-around" alignItems="center">
				<Box px={2}>
					<Box h={130} w={130}>
						{/*次の授業開始時刻まで60分を切ったらプログレスバーをカウントダウンしていく(それまでは常時100%)*/}
						{/*その日にもう授業がない場合は次の授業が無い旨を表示する*/}
						<CircularProgressbarWithChildren value={percentage} styles={buildStyles({
							pathColor: "#57dfd0",
							trailColor: "#ededed"
						})}>
							<Text className="kr" fontSize={13}>あと</Text>
							<Text className="kb" fontSize={20}>{remainingTime}分</Text>
						</CircularProgressbarWithChildren>
					</Box>
				</Box>
				<Box px={2}>
					<Text className="ksb" textAlign="center" bg="#5ae7d3" fontSize="0.7rem" mb="0.5rem" w="100%" h="0.9rem">{hourLabel}</Text>
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
			<Center mt={4} justifyContent="space-around">
				<Button variant="outline" size="sm" colorScheme="green" leftIcon={<Image src="/classroom.svg" width={20} height={17}></Image>}>
					<a href={lectureData.classroomLink} target="_blank" rel="noopener noreferrer">Classroomを開く</a>
				</Button>
			</Center>
		</Box>
	)
}

export default NextClass