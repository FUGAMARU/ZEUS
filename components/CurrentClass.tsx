//Custom Hooks
import { useTouchDevice } from '../hooks/useTouchDevice'

//Next.js Components
import Image from 'next/image'

//Chakra UI Components
import { Box, Text, Flex, Button } from '@chakra-ui/react'

//Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardUser, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const CurrentClass = () => {
	const percentage = 65
	const isTouchDevice = useTouchDevice()

	return(
		<Box bg="white" shadow="xl" borderRadius={15} py={4} transition="0.4s all ease-out" _hover={!isTouchDevice ? {transform: "scale(1.05, 1.05)"} : {}}>
			<Text className="rmb" color="#2b2b2b" fontSize={23} ml={5}>現在の授業</Text>
			<Box h={1} w="80%" mb={3} bgGradient="linear(to-r, #dfec51, #73aa0a)" borderRightRadius={10}></Box>
			<Flex justifyContent="space-around" alignItems="center">
				<Box px={2}>
					<Box h={130} w={130}>
						<CircularProgressbarWithChildren value={percentage} styles={buildStyles({
							pathColor: "#dae93f",
							trailColor: "#ededed"
						})}>
							<Text className="kr" fontSize={13}>残り</Text>
							<Text className="kb" fontSize={20}>63分</Text>
						</CircularProgressbarWithChildren>
					</Box>
				</Box>
				<Box px={2}>
					<Text className="kb" textAlign="center">モバイルプログラミング Ⅰ</Text>
					<hr className="class-hr"/>
					<Flex justifyContent="center" alignItems="center">
						<FontAwesomeIcon icon={faClock} color="#4a4848" style={{height: "0.8rem"}} /><Text className="kr" textAlign="center" fontSize={13} ml={1.5} >1時限～4時限</Text>
					</Flex>
					<Flex justifyContent="center" alignItems="center">
						<FontAwesomeIcon icon={faLocationDot} color="#4a4848" style={{height: "0.8rem"}} /><Text className="kr" textAlign="center" fontSize={13} ml={1.5} >研究棟B 5階 第1教室</Text>
					</Flex>
					<Flex justifyContent="center" alignItems="center">
						<FontAwesomeIcon icon={faChalkboardUser} color="#4a4848" style={{height: "0.8rem"}} /><Text className="kr" textAlign="center" fontSize={13} ml={1.5} >桜 ねね</Text>
					</Flex>
				</Box>
			</Flex>
			<Flex mt={4} justifyContent="space-around">
				<Button variant="outline" size="sm" colorScheme="green" leftIcon={<Image src="/classroom.svg" width={20} height={17}></Image>}>
					<a href="https://classroom.google.com/" target="_blank" rel="noopener noreferrer">Classroomを開く</a>
				</Button>
				<Button variant="outline" size="sm" colorScheme="blue" leftIcon={<Image src="/zoom.svg" width={22} height={22}></Image>}>
				<a href="https://zoom.us/" target="_blank" rel="noopener noreferrer">Zoomに参加する</a>
				</Button>
			</Flex>
		</Box>
	)
}

export default CurrentClass