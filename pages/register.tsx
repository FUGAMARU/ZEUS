//React Hooks
import { useState, useEffect } from "react"

//Next.js Components
import { NextPage } from "next"
import Image from "next/image"
import Router from "next/router"

//Chakra UI Components
import { Flex, Box, Text, Avatar, Center, Input, Select, RadioGroup, Radio, Stack, ButtonGroup, Button } from "@chakra-ui/react"

//Custom Components
import Loading from "../components/Loading"

//Libraries
import { useWindupString, WindupChildren, Pace } from "windups"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"

const Register: NextPage = () => {
	const [displayState, setDisplayState] = useState(false) //false => ローディング画面, true => 情報登録画面
	const [campus, setCampus] = useState("kamata") //キャンパス選択ラジオボタン用state
	const [accountType, setAccountType] = useState("student") //アカウントタイプ選択ラジオボタン用state

	//未ログイン状態でregister.tsx開いたらトップページに飛ばす
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if(user){
				setDisplayState(true)
			}else{
				Router.push("/")
			}
		})

		return (() => {
			unsubscribe()
		})
	}, [])

	const [guideText1] = useWindupString("神のご加護まであとちょっと！")
	const [guideText2] = useWindupString("ユーザー情報を登録しましょう")
	const [guideText1Element, setGuideText1Element] = useState<null|JSX.Element>(null)
	const [guideText2Element, setGuideText2Element] = useState<null|JSX.Element>(null)
	const animationController = () => {
		setGuideText1Element(<WindupChildren>
								<Pace ms={75}>{guideText1}</Pace>
							</WindupChildren>)
		setTimeout(() => {
			setGuideText2Element(<WindupChildren>
				<Pace ms={75}>{guideText2}</Pace>
			</WindupChildren>)
		}, 1300)
	}

	if(displayState){
		return(
			<Flex minHeight="100vh" bg="#f0f0f0" justifyContent="center" alignItems="center" flexFlow="column">
				<Box className="animate__animated animate__fadeIn animate__slow" onAnimationEnd={animationController} px={{base: "2rem", md: "3rem", lg: "4rem"}} pt={{base: "2rem", md: "3rem", lg: "3rem"}} pb={0} bg="white" shadow="2xl" borderRadius={15} borderTop="solid 5px #5fc2c5">
					<Image className="animate__animated animate__fadeInUp animate__delay-1s" src="/zeus.svg" width={269} height={70} />
					<Text className="ksb" textAlign="center" fontSize="0.9rem" h="0.9rem">{guideText1Element}</Text>
					<Text className="ksb" textAlign="center" fontSize="0.9rem" h="0.9rem">{guideText2Element}</Text>
					<Box className="animate__animated animate__fadeIn animate__delay-5s">
						<Center mt={5}>
							<Avatar src="/anonymous.png" size="xl" cursor="pointer"></Avatar>
						</Center>
						<Text className="kr" textAlign="center" fontSize="0.7rem" mt={2}>クリックしてアイコンをアップロード</Text>
						<Flex justifyContent="space-around" mt={3}>
							<Input textAlign="center" variant="flushed" w="6rem" focusBorderColor="#5fc2c5" placeholder="姓"></Input>
							<Input textAlign="center" variant="flushed" w="6rem" focusBorderColor="#5fc2c5" placeholder="名"></Input>
						</Flex>
						<Text className="kr" textAlign="center" fontSize="0.9rem" mt={3}>アカウントタイプ</Text>
						<Center>
							<RadioGroup onChange={setAccountType} value={accountType}>
								<Stack direction="row">
									<Radio value="student" colorScheme="cyan"><Text className="kr">学生</Text></Radio>
									<Radio value="teacher" colorScheme="cyan"><Text className="kr">教師</Text></Radio>
								</Stack>
							</RadioGroup>
						</Center>
						<Text className="kr" textAlign="center" fontSize="0.9rem" mt={3}>キャンパス</Text>
						<Center>
							<RadioGroup onChange={setCampus} value={campus}>
								<Stack direction="row">
									<Radio value="kamata" colorScheme="cyan"><Text className="kr">蒲田</Text></Radio>
									<Radio value="hachioji" colorScheme="cyan"><Text className="kr">八王子</Text></Radio>
									<Radio value="hokkaido" colorScheme="cyan"><Text className="kr">北海道</Text></Radio>
								</Stack>
							</RadioGroup>
						</Center>
						<Select placeholder="- 所属学科・学年・クラスを選択 -" mt={3} size="sm">
							<option value="C2-35-1">情報処理科2年1組</option>
							<option value="C2-35-2">情報処理科2年2組</option>
							<option value="C2-35-3">情報処理科2年3組</option>
							<option value="C2-35-4">情報処理科2年4組</option>
							<option value="C2-36-1">情報処理科1年1組</option>
							<option value="C2-36-2">情報処理科1年2組</option>
							<option value="C2-36-3">情報処理科1年3組</option>
							<option value="C2-36-4">情報処理科1年4組</option>
							<option value="C2-36-5">情報処理科1年5組</option>
						</Select>
						<Flex justifyContent="space-around" my={7} transition="0.2s all ease-out" _hover={{bg: "#ffffff", boxShadow: "5px 5px 11px #dedede, -5px -5px 11px #ffffff"}} alignItems="center" px={5} py={3} borderRadius={25} cursor="pointer">
							<Text className="ksb" color="#72c2c6">登録する</Text>
						</Flex>
					</Box>
				</Box>
			</Flex>
		)
	}else{
		return <Loading />
	}
}

export default Register