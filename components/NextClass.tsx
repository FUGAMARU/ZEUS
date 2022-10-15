//React Hooks
import { useState, useEffect } from "react"

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
import { getLectureData, getLocationFromReference, getTeacherFromReference } from "../firebase"

//Useful Functions
import { getTimestamp, whattimeIsIt, getRemainingTime } from "../functions"

//Global State Management
import { useRecoilValue } from "recoil"
import { UserdataAtom } from "../atoms/UserdataAtom"

interface Props {
  UNIXTime: number,
  updateFlag: boolean
}

const NextClass = (props: Props) => {
  const userdata = useRecoilValue(UserdataAtom)
  //カードに表示するデーター
  const [lectureData, setLectureData] = useState({
    name: "取得中…",
    hours: "取得中…",
    locationName: "取得中…",
    teacherName: "取得中",
    classroomLink: "https://classroom.google.com/"
  })
  const [percentage, setPercentage] = useState(0)
  const [remainingTime, setRemainingTime] = useState("-")
  const [isInSession, setInSession] = useState(false) //授業が開講中かどうか
  const [lastUpdate, setLastUpdate] = useState(0) //判定時間の1分間で毎秒Firebaseにデーター取りに行かないようにするための判定用state

  useEffect(() => {
    //残り時間を計算・表示する
    const receivedRemainingTime = getRemainingTime(props.UNIXTime, "next")
    if (receivedRemainingTime === null || !!!isInSession) { //授業時間外の場合
      setPercentage(0)
      setRemainingTime("-")
    } else {
      setPercentage(Math.round(receivedRemainingTime / 45 * 100))
      setRemainingTime(String(receivedRemainingTime))
    }

    //授業開始・終了時間に授業情報の取得を行う
    const timings = [830, 930, 1015, 1110, 1155, 1330, 1415, 1510, 1555]
    const timestamp = getTimestamp(props.UNIXTime)
    if (timings.includes(timestamp) && timestamp !== lastUpdate) {
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
  const settingLectureData = async () => {
    const res = await getLectureData("next", userdata.uid, props.UNIXTime)
    console.log("==========次の授業情報==========")
    console.log(res)
    if (typeof res === "string") {
      setLectureData({
        name: "次の授業はありません",
        hours: "ㅤㅤㅤㅤㅤㅤㅤ",
        locationName: "ㅤㅤㅤㅤㅤㅤㅤ",
        teacherName: "ㅤㅤㅤㅤㅤㅤㅤ",
        classroomLink: "https://classroom.google.com/",
      })
      setInSession(false)
    } else {
      const location = await getLocationFromReference(res.location)
      const teacher = await getTeacherFromReference(res.teacher)

      setLectureData({
        name: res.name,
        hours: res.hours,
        locationName: location.name,
        teacherName: teacher.name,
        classroomLink: res.classroom,
      })
      setInSession(true)
    }
  }

  return (
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
          <Text className="ksb" textAlign="center" bg="#5ae7d3" fontSize="0.7rem" mb="0.5rem" w="100%" h="0.9rem">{isInSession ? `${whattimeIsIt(props.UNIXTime, "next") + 1}時限目` : ""}</Text>
          <Text className="kb" textAlign="center">{lectureData.name}</Text>
          <hr className="class-hr" />
          <Flex justifyContent="center" alignItems="center">
            <FontAwesomeIcon icon={faClock} color="#4a4848" style={{ height: "0.8rem" }} /><Text className="kr" textAlign="center" fontSize={13} ml={1.5} >{lectureData.hours}</Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <FontAwesomeIcon icon={faLocationDot} color="#4a4848" style={{ height: "0.8rem" }} /><Text className="kr" textAlign="center" fontSize={13} ml={1.5} >{lectureData.locationName}</Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <FontAwesomeIcon icon={faChalkboardUser} color="#4a4848" style={{ height: "0.8rem" }} /><Text className="kr" textAlign="center" fontSize={13} ml={1.5} >{lectureData.teacherName}</Text>
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