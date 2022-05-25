//React Hooks
import { useEffect, useState } from "react"

//Custom Hooks
import { useResponsive } from "../hooks/useResponsive"
import { useTouchDevice } from "../hooks/useTouchDevice"
import useUNIXTime from "../hooks/useUNIXTime"

//Next.js Components
import type { NextPage } from "next"
import Image from "next/image"
import Router from "next/router"

//Chakra UI Components
import { Container, Box, Center, SimpleGrid, Text, Button } from "@chakra-ui/react"

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
import { auth, checkUserDataExists, getUserData, getClassName } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

const Index: NextPage = () => {
	const responsiveType = useResponsive() //リアクティブな画面幅タイプの変数
	const isTouchDevice = useTouchDevice() //タッチ可能かどうか
	const { localUNIXTime } = useUNIXTime()
	const [UID, setUID] = useState("") //ログイン中ユーザーのUID
	const [isAuthenicated, setAuthenicated] = useState<null|boolean>(null) //ログインされているか否か True => 通常のZEUSポータル, False => ログイン・登録ページ, null => ローディング画面
	const [userName, setUserName] = useState("") //ユーザー名
	const [userIconSrc, setUserIconSrc] = useState("") //ユーザーアイコンの画像URL
	const [className, setClassName] = useState("") //所属クラスの表示名
	const [classID, setClassID] = useState("") //所属クラスID

	const switchRegistered = (sw: boolean) => {
		setAuthenicated(sw)
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
						const res = await getUserData(user.uid)
						setUserName(res.name)
						setUserIconSrc(res.iconSrc)
						setUID(user.uid)
						setClassName(await getClassName(user.uid))
						setClassID(res.class)
						setAuthenicated(true) //ローディング画面解除
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

	if(isAuthenicated){ //通常のZEUSポータルを表示
		return (
			<Box className="animate__animated animate__fadeIn" minHeight="100vh" bg="#f0f0f0" position="relative" overflowX="hidden">
				{/*base => スマホ / md => タブレット / lg => PC*/}
				<Box h="0.5rem"></Box>
				<Container maxW="1280px" px={0}>
					<SimpleGrid columns={3} spacing={0}>
						<Center>
							{localUNIXTime === 0 ? <p className="kb">現在時刻取得中…</p> : localUNIXTime === -1 ? <p className="kb">時刻取得エラー</p> : <Clock UNIXTime={localUNIXTime} />}
						</Center>
						<Center>
							<Image src="/zeus.svg" width={269} height={70} />
						</Center>
						<Center>
							<UserInfo userName={userName} userIconSrc={userIconSrc} />
						</Center>	
					</SimpleGrid>

					<Text className="ksb" textAlign="center" fontSize="0.8rem" mt={3}>{className} ({classID})</Text>
	
					<SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={5} my={3} mx={3}>
						<FunctionCard title="現在の授業" gradientStartHex="#dfec51" gradientEndHex="#73aa0a" childComponent={<CurrentClass UID={UID} />} />
						<FunctionCard title="次の授業" gradientStartHex="#09e7d3" gradientEndHex="#008bb6" childComponent={<NextClass UID={UID} />} />
						<FunctionCard title="FileDispenser" gradientStartHex="#ffd97b" gradientEndHex="#f6a742" childComponent={<FileDispenser />} />
						<FunctionCard title="チャット" gradientStartHex="#09e863" gradientEndHex="#00b684" childComponent={<Chat ClassID={classID} userName={userName} iconSrc={userIconSrc} />} />
						<FunctionCard title="BBS" gradientStartHex="#a2b6df" gradientEndHex="#33569b" childComponent={<BBS />} />
						<FunctionCard title="お知らせ" gradientStartHex="#efbfd5" gradientEndHex="#9d61fd" childComponent={<Information />} />
						<Box bg="teal.300">システムログ</Box>
					</SimpleGrid>
	
					<Center bg="gray.300">フッター</Center>
					<Text display="inline-block">{`Responsive: ${responsiveType}`}</Text>&nbsp;&nbsp;&nbsp;<Text display="inline-block">{`Touchable: ${isTouchDevice ? "Yes" : "No"}`}</Text><br />
					<Button size="xs" colorScheme="pink">Use Timemachine</Button>
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