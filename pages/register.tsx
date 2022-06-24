//React Hooks
import { useState, useEffect, useRef } from "react"

//Next.js Components
import { NextPage } from "next"
import Image from "next/image"
import Router from "next/router"

//Chakra UI Components
import { Flex, Box, Text, Avatar, Center, Input, Select, RadioGroup, Radio, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button } from "@chakra-ui/react"

//Custom Components
import Loading from "../components/Loading"

//Libraries
import { useWindupString, WindupChildren, Pace } from "windups"
import { onAuthStateChanged } from "firebase/auth"
import Cropper from "react-cropper"
import "cropperjs/dist/cropper.css"
import imageCompression from "browser-image-compression"

//Useful Functions
import { escapeHTML } from "../functions"

//Settings
import { auth, registerUserInformation, checkUserDataExists } from "../firebase"

const Register: NextPage = () => {
	const [displayState, setDisplayState] = useState(false) //false => ローディング画面, true => 情報登録画面
	const [campus, setCampus] = useState("K") //キャンパス選択ラジオボタン用state
	const [accountType, setAccountType] = useState("student") //アカウントタイプ選択ラジオボタン用state
	const [UID, setUID] = useState("") //Firebase Auth認証済みユーザーのUID
	const [showSpinner, setShowSpinner] = useState(false) //登録ボタンにスピナーを表示するかどうか
	const [validationErrMsg, setValidationErrMsg] = useState("")

	//フォーム入力データー取得用
	const { isOpen, onOpen, onClose } = useDisclosure()
	const inputRef = useRef<HTMLInputElement>(null)
	const [userIconPreview, setUserIconPreview] = useState("/anonymous.png")
	const [cropper, setCropper] = useState<any>()
	const [userIconFlag, setUserIconFlag] = useState(false) //True => アイコンアップロード済み, False => アイコン未設定
	const [cropData, setCropData] = useState("") //正方形切り取り後の画像(Base64)
	const secondName = useRef<HTMLInputElement>(null) //姓
	const firstName = useRef<HTMLInputElement>(null) //名
	const [selectedClass, setSelectedClass] = useState("")

	useEffect(() => {
		//未ログイン状態でregister.tsx開いたらトップページに飛ばす
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if(user){
				(async() => {
					if(await checkUserDataExists(user.uid)){
						Router.push("/") //ユーザー情報の登録が済んでいる状態でregister.tsx開いたらトップページに飛ばす
					}else{
						setUID(user.uid)
						setDisplayState(true)
					}
				})()
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

	const onChange = (e: any) => {
		e.preventDefault()
		let files

		if (e.dataTransfer) {
			files = e.dataTransfer.files
		} else if (e.target) {
			files = e.target.files
		}

		const reader = new FileReader()

		reader.onload = () => {
			setUserIconPreview(reader.result as any)
		}

		reader.readAsDataURL(files[0])
		setUserIconPreview("")
		onOpen()
	}

	const getCropData = () => {
		if(typeof cropper !== "undefined")	{
			const cropData = cropper.getCroppedCanvas().toDataURL()
			setCropData(cropData)
			setUserIconPreview(cropData)
		}
	}

	const customUploadFunction = () => {
		inputRef.current?.click()
	}

	const dataValidation = () => {
		let errMsg = ""
		if(secondName.current?.value === "" || firstName.current?.value === "") errMsg += "名前に空欄があります\n"
		if(selectedClass === "") errMsg += "所属学科・学年・クラスが選択されていません\n"
		
		if(errMsg === ""){
			setValidationErrMsg("")
			setShowSpinner(true)
			register()
		}else{
			setValidationErrMsg(errMsg)
		}
	}

	const register = async () => {
		if(secondName.current?.value && firstName.current?.value){
			const escapedSecondName = escapeHTML(secondName.current.value)
			const escapedFirstName = escapeHTML(firstName.current.value)
			const data = {
				name: `${escapedSecondName} ${escapedFirstName}`,
				class: `${campus}-${selectedClass}`
			}
			if(userIconFlag){
				const img = await imageCompression.getFilefromDataUrl(cropData, "icon")
				const compressedFile = await imageCompression(img, {maxSizeMB: 0.3, maxWidthOrHeight: 512}); //Blob
				await registerUserInformation(UID, accountType, data, compressedFile)
				Router.push("/")
			}else{
				await registerUserInformation(UID, accountType, data, null)
				Router.push("/")
			}
		}
	}

	const handleCrop = () => {
		if(inputRef.current?.value){
			inputRef.current.value = ""
		}
		getCropData()
		onClose()
		setUserIconFlag(true)
	}

	if(displayState){
		return(
			<>
				<Modal isOpen={isOpen} onClose={() => {setUserIconPreview("/anonymous.png");onClose()}} size="xl">
					<ModalOverlay />
					<ModalContent>
						<ModalHeader><Text className="kb">クロップ</Text></ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Cropper
								style={{ maxHeight: "30rem", width: "100%" }}
								initialAspectRatio={1}
								src={userIconPreview}
								viewMode={1}
								aspectRatio={1}
								minCropBoxHeight={10}
								minCropBoxWidth={10}
								background={false}
								responsive={true}
								autoCropArea={1}
								checkOrientation={false}
								onInitialized={(instance) => {
									setCropper(instance);
								}}
								guides={true}
							/>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={handleCrop}>切り抜く</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>

				<Flex minHeight="100vh" bg="#f0f0f0" justifyContent="center" alignItems="center" flexFlow="column">
					<Box className="animate__animated animate__fadeIn animate__slow" onAnimationEnd={animationController} px={{base: "2rem", md: "3rem", lg: "4rem"}} pt={{base: "2rem", md: "3rem", lg: "3rem"}} pb={0} bg="white" shadow="2xl" borderRadius={15} borderTop="solid 5px #10c9c3">
						<Image className="animate__animated animate__fadeInUp animate__delay-1s" src="/zeus.svg" width={269} height={70} />
						<Text className="ksb" textAlign="center" fontSize="0.9rem" h="0.9rem">{guideText1Element}</Text>
						<Text className="ksb" textAlign="center" fontSize="0.9rem" h="0.9rem">{guideText2Element}</Text>
						<Box className="animate__animated animate__fadeIn animate__delay-5s">
							<Center mt={5}>
								<Avatar src={userIconPreview} size="xl" cursor="pointer" onClick={customUploadFunction}></Avatar>
								<input ref={inputRef} type="file" accept="image/jpeg, image/png" onChange={onChange} style={{display: "none"}} />
							</Center>
							<Text className="kr" textAlign="center" fontSize="0.7rem" mt={2} onClick={customUploadFunction} cursor="pointer">クリックしてアイコンをアップロード</Text>
							<Flex justifyContent="space-around" mt={3}>
								<Input ref={secondName} textAlign="center" variant="flushed" w="6rem" focusBorderColor="#10c9c3" placeholder="姓"></Input>
								<Input ref={firstName} textAlign="center" variant="flushed" w="6rem" focusBorderColor="#10c9c3" placeholder="名"></Input>
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
										<Radio value="K" colorScheme="cyan"><Text className="kr">蒲田</Text></Radio>
										<Radio value="G" colorScheme="cyan"><Text className="kr">八王子</Text></Radio>
										<Radio value="H" colorScheme="cyan"><Text className="kr">北海道</Text></Radio>
									</Stack>
								</RadioGroup>
							</Center>
							<Select placeholder="- 所属学科・学年・クラスを選択 -" mt={3} size="sm" onChange={(e) => setSelectedClass(e.target.value)}>
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
							<Flex onClick={dataValidation} justifyContent="space-around" my={7} h="2.5rem" transition="0.2s all ease-out" _hover={{bg: "#ffffff", boxShadow: "5px 5px 11px #dedede, -5px -5px 11px #ffffff"}} alignItems="center" px={5} py={3} borderRadius={25} cursor="pointer">
								{showSpinner ? <Image src="/spinner.svg" height={20} width={20}></Image> : <Text className="ksb" color="#10c9c3">登録する</Text>}
							</Flex>
							<Center>
								<Text className="kr" color="red" fontSize="0.8rem" whiteSpace="pre-line" textAlign="center" mb={5}>{validationErrMsg}</Text>
							</Center>
						</Box>
					</Box>
				</Flex>
			</>
		)
	}else{
		return <Loading />
	}
}

export default Register