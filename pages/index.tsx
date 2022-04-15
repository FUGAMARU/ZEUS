//React Hooks
import { useEffect, useState, useContext } from "react"

//Custom Hooks
import { useResponsive } from "../hooks/useResponsive"
import { useTouchDevice } from "../hooks/useTouchDevice"
import useUNIXTime from "../hooks/useUNIXTime"
import { useAuthState } from "react-firebase-hooks/auth"

//Next.js Components
import Head from "next/head"
import type { NextPage } from "next"
import Image from "next/image"

//Chakra UI Components
import { Container, Box, Center, SimpleGrid, Text, Flex, Button } from "@chakra-ui/react"

//Custom Components
import Clock from "../components/Clock"
import UserInfo from "../components/UserInfo"
import FunctionCard from "../components/FunctionCard"
import CurrentClass from "../components/CurrentClass"
import NextClass from "../components/NextClass"
import FileDispenser from "../components/FileDispenser"
import Chat from "../components/Chat"
import BBS from "../components/BBS"
import Information from "../components/Information"

//Contexts
import { SocketContext } from "../contexts/SocketIO"

//Settings
import { auth, provider } from "../firebase"

const Index: NextPage = () => {
	const { UNIXTime, isUNIXTimeLoading, isUNXITimeError } = useUNIXTime()
	const [localUNIXTime, setLocalUnixTime] = useState(0) //UNIXタイムスタンプ(1秒ごとに自動更新)
	const [isClockStarted, setClockStarted] = useState(false) //UNIXタイムスタンプのカウントアップがスタートしているか
	const socket = useContext(SocketContext) //Socket.IOオブジェクトのContext
	const [authenicated] = useAuthState(auth) //Firebase Authで認証済みかどうかのステート

	useEffect(() => {
		socket.on("connection", (res: string) => {
			console.log("WebSocket接続完了！")
			console.log(res)
		})
	}, [socket])

	useEffect(() => {
		console.log("UNIXタイムスタンプ新規受信")
		console.log(UNIXTime)
		if(UNIXTime){
			if(isClockStarted === false){
				setLocalUnixTime(UNIXTime + 1)
				setClockStarted(true)
				setInterval(() => {
					setLocalUnixTime(prev => prev + 1)
				}, 1000)
			}else{
				setLocalUnixTime(UNIXTime + 1)
				console.log(`時刻合わせ完了 - ${new Date(UNIXTime * 1000).toString()}`)
			}
		}
	}, [UNIXTime])

	if(authenicated){ //通常のZEUSポータルを表示
		return (
			<Box minHeight="100vh" bg="#f0f0f0" position="relative">
				<Head>
					<title>ZEUS</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				{/*base => スマホ / md => タブレット / lg => PC*/}
				<Box h="0.5rem"></Box>
				<Container maxW="1280px" px={0}>
					<SimpleGrid columns={3} spacing={0}>
						<Center>
							{isUNIXTimeLoading ? <p className="kb">現在時刻取得中…</p> : isUNXITimeError ? <p className="kb">時刻取得エラー</p> : <Clock UNIXTime={localUNIXTime} />}
						</Center>
						<Center>
							<Image src="/zeus.svg" width={269} height={70} />
						</Center>
						<Center>
							<UserInfo />
						</Center>	
					</SimpleGrid>
	
					<SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={5} my={10} mx={3}>
						<FunctionCard title="現在の授業" gradientStartHex="#dfec51" gradientEndHex="#73aa0a" childComponent={<CurrentClass />} />
						<FunctionCard title="次の授業" gradientStartHex="#09e7d3" gradientEndHex="#008bb6" childComponent={<NextClass />} />
						<FunctionCard title="FileDispenser" gradientStartHex="#ffd97b" gradientEndHex="#f6a742" childComponent={<FileDispenser />} />
						<FunctionCard title="チャット" gradientStartHex="#09e863" gradientEndHex="#00b684" childComponent={<Chat />} />
						<FunctionCard title="BBS" gradientStartHex="#a2b6df" gradientEndHex="#33569b" childComponent={<BBS />} />
						<FunctionCard title="お知らせ" gradientStartHex="#efbfd5" gradientEndHex="#9d61fd" childComponent={<Information />} />
						<Box bg="teal.300">システムログ</Box>
					</SimpleGrid>
	
					<Center bg="gray.300">フッター</Center>
					<Text display="inline-block">{`Responsive: ${useResponsive()}`}</Text>&nbsp;&nbsp;&nbsp;<Text display="inline-block">{`Touchable: ${useTouchDevice() ? "Yes" : "No"}`}</Text>
				</Container>
				
				<Box position="absolute" bottom={{base: 5, md: 19, lg: 30}} right={{base: 5, md: 19, lg: 30}} height={{base: 120, md: 160, lg: 200}} width={{base: 86, md: 114, lg: 143}} style={{transform: "rotate(15deg)"}}>
					<Image src="/pacchixi.png" layout="fill" />
				</Box>
			</Box>
		)
	}else{ //ログイン・登録ページを表示
		return(
			<Flex minHeight="100vh" bg="#f0f0f0" justifyContent="center" alignItems="center">
				<Box p={{base: "2rem", md: "3rem", lg: "4rem"}} bg="white" shadow="2xl" borderRadius={15}>
					<Image src="/zeus.svg" width={269} height={70} />
					<Text className="ksb" textAlign="center"fontSize="0.9rem" >全知の神の救済はここから始まる...</Text>
						<Flex justifyContent="space-around" my={7} transition="0.4s all ease-out" _hover={{bg: "#ffffff", boxShadow: "5px 5px 11px #dedede, -5px -5px 11px #ffffff"}} alignItems="center" px={5} py={3} borderRadius={20} cursor="pointer">
							<Image src="/google.svg" width={28} height={28} />
							<Text className="ksb" ml={2}>Googleで登録・ログイン</Text>
						</Flex>
					<Center>
						<Text className="ksb" fontSize="0.7rem" textAlign="center">登録には&nbsp;neec.ac.jp&nbsp;ドメインの<br />Googleアカウントが必要です</Text>
					</Center>
				</Box>
				
			</Flex>
		)
	}
}

export default Index