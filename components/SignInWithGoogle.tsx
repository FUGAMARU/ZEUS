//React Hooks
import { useState } from "react"

//Next.js Components
import Image from "next/image"
import Router from "next/router"

//Chakra UI Components
import { Flex, Box, Text, Center} from "@chakra-ui/react"

//Libraries
import { signInWithPopup, getAdditionalUserInfo, deleteUser, User } from "firebase/auth"
import { useWindupString, WindupChildren, Pace } from "windups"

//Settings
import { auth, provider } from "../firebase"

interface Props {
	switchRegistered: Function
}

const SignInWithGoogle = (props: Props) => {
	const signInWithGoogle = async () => {
		try{
			const res = await signInWithPopup(auth, provider)
			if(res.user.email?.match(/neec.ac.jp/)){ //学校のメアドか？
				if(getAdditionalUserInfo(res)?.isNewUser){ //登録
					//ユーザー情報登録ページに遷移
					Router.push("/register")
				}
			}else{
				//学校のメアドじゃないからユーザー削除
				const user = auth.currentUser
				if(user) await deleteUser(user)
				Router.push("/")
			}
		}catch{
			console.log("Googleログインエラー")
		}
	}
	
	const [sloganText] = useWindupString("全知の神の救済はここから始まる...")
	const [sloganElements, setSloganElements] = useState<null|JSX.Element>(null)
	const animationController = () => {
		setTimeout(() => {
			setSloganElements(<WindupChildren>
				<Pace ms={75}>{sloganText}</Pace>
				</WindupChildren>)
		}, 200)
	}

	return (
		<Flex minHeight="100vh" bg="#f0f0f0" justifyContent="center" alignItems="center">
			<Box className="animate__animated animate__fadeIn animate__slow" onAnimationEnd={animationController} p={{base: "2rem", md: "3rem", lg: "4rem"}} bg="white" shadow="2xl" borderRadius={15} borderTop="solid 5px #10c9c3">
				<Image className="animate__animated animate__fadeInUp animate__delay-1s" src="/zeus.svg" width={269} height={70} />
				<Text className="ksb" textAlign="center"fontSize="0.9rem" h="1rem" >
					{sloganElements}
				</Text>
					<Flex className="animate__animated animate__bounceIn animate__delay-4s" onClick={signInWithGoogle} justifyContent="space-around" my={7} transition="0.2s all ease-out" _hover={{bg: "#ffffff", boxShadow: "5px 5px 11px #dedede, -5px -5px 11px #ffffff"}} alignItems="center" px={5} py={3} borderRadius={25} cursor="pointer">
						<Image src="/google.svg" width={28} height={28} />
						<Text className="ksb" ml={2}>Googleで登録・ログイン</Text>
					</Flex>
				<Center>
					<Text className="ksb animate__animated animate__fadeIn animate__slow animate__delay-5s" fontSize="0.7rem" textAlign="center">登録には&nbsp;neec.ac.jp&nbsp;ドメインの<br />Googleアカウントが必要です</Text>
				</Center>
			</Box>
		</Flex>
	)
}

export default SignInWithGoogle