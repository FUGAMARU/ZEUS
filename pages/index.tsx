//React Hooks
import { useEffect, useState, useContext } from "react"

//Custom Hooks
import { useResponsive } from "../hooks/useResponsive"
import { useTouchDevice } from "../hooks/useTouchDevice"
import useUNIXTime from "../hooks/useUNIXTime"

//Next.js Components
import Head from "next/head"
import type { NextPage } from "next"
import Image from "next/image"
import Router from "next/router"

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
import SignInWithGoogle from "../components/SignInWithGoogle"
import Loading from "../components/Loading"

//Libraries
import { onAuthStateChanged } from "firebase/auth"

//Contexts
import { SocketContext } from "../contexts/SocketIO"

//Settings
import { auth, checkUserDataExists } from "../firebase"

const Index: NextPage = () => {
	const responsiveType = useResponsive() //リアクティブな画面幅タイプの変数
	const isTouchDevice = useTouchDevice() //タッチ可能かどうか
	const { UNIXTime, isUNIXTimeLoading, isUNXITimeError } = useUNIXTime()
	const [localUNIXTime, setLocalUnixTime] = useState(0) //UNIXタイムスタンプ(1秒ごとに自動更新)
	const [isClockStarted, setClockStarted] = useState(false) //UNIXタイムスタンプのカウントアップがスタートしているか
	const socket = useContext(SocketContext) //Socket.IOオブジェクトのContext
	const [isAuthenicated, setAuthenicated] = useState<null|boolean>(null) //ログインされているか否か

	const switchRegistered = (arg: boolean) => {
		setAuthenicated(arg)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if(user){
				(async() => {
					console.log("=====ユーザー情報=====")
					console.log(user)
					//Firestoreにユーザー情報が登録されているかどうか
					const userExists = await checkUserDataExists(user.uid)
					if(userExists){ //ログインされている状態でユーザー情報の登録まで済んでいる
						setAuthenicated(true)
					}else{ //ログインされている状態だけどユーザー情報の登録は済んでいない
						setAuthenicated(null) //ローディング画面を表示させて
						Router.push("/register") //登録画面に遷移させる
					}
				})()
			}else{ //ログインされていない→ユーザー情報の登録が済んでいるはずがない
				setAuthenicated(false)
				console.log("ログインされていません")
			}
		})

		return (() => {
			unsubscribe()
		})
	}, [])

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

	if(isAuthenicated){ //通常のZEUSポータルを表示
		return (
			<Box className="animate__animated animate__fadeIn" minHeight="100vh" bg="#f0f0f0" position="relative">
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
					<Text display="inline-block">{`Responsive: ${responsiveType}`}</Text>&nbsp;&nbsp;&nbsp;<Text display="inline-block">{`Touchable: ${isTouchDevice ? "Yes" : "No"}`}</Text><Button size="xs" ml={4} colorScheme="teal" onClick={() => auth.signOut()}>SignOut</Button>
				</Container>
				
				<Box position="absolute" bottom={{base: 5, md: 19, lg: 30}} right={{base: 5, md: 19, lg: 30}} height={{base: 120, md: 160, lg: 200}} width={{base: 86, md: 114, lg: 143}} style={{transform: "rotate(15deg)"}}>
					<Image src="/pacchixi.png" layout="fill" />
				</Box>
			</Box>
		)
	}else if(isAuthenicated === false){ //ログイン・登録ページを表示
		return <SignInWithGoogle switchRegistered={switchRegistered} />
	}else if(isAuthenicated === null){ //ローディング画面(Firebase Authの認証情報取得待ち)
		return <Loading />
	}else{
		return null
	}
}

export default Index