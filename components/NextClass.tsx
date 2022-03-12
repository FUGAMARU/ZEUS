//Custom Hooks
import { useTouchDevice } from '../hooks/useTouchDevice'

//Next.js Components
import Image from 'next/image'

//Chakra UI Components
import { Box, Text, Flex, Button, Center } from '@chakra-ui/react'

//Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const NextClass = () => {
	const percentage = 62
	const isTouchDevice = useTouchDevice()

	return(
		<Box bg="white" shadow="xl" borderRadius={15} py={4} transition="0.4s all ease-out" _hover={!isTouchDevice ? {transform: "scale(1.05, 1.05)"} : {}}>
			<Text className="kb" color="black" fontSize={23} ml={5}>次の授業</Text>
			<Box h={1} w="80%" bgGradient="linear(to-r, #09e7d3, #008bb6)" borderRightRadius={10}></Box>
			<Flex mt={3} justifyContent="space-around" alignItems="center">
				<Box px={2}>
					<Box h={130} w={130}>
						{/*次の授業開始時刻まで60分を切ったらプログレスバーをカウントダウンしていく(それまでは常時100%)*/}
						<CircularProgressbarWithChildren value={percentage} styles={buildStyles({
							pathColor: "#57dfd0",
							trailColor: "#ededed"
						})}>
							<Text className="kr" fontSize={13}>あと</Text>
							<Text className="kb" fontSize={20}>37分</Text>
						</CircularProgressbarWithChildren>
					</Box>
				</Box>
				<Box px={2}>
					<Text className="kb" textAlign="center">モバイル設計 Ⅰ</Text>
					<Flex justifyContent="center" alignItems="center">
						<FontAwesomeIcon icon={faClock} color="#4a4848" style={{height: "0.8rem"}} /><Text className="kr" textAlign="center" fontSize={13} ml={1.5} >5時限～7時限</Text>
					</Flex>
					<Flex justifyContent="center" alignItems="center">
						<FontAwesomeIcon icon={faChalkboardUser} color="#4a4848" style={{height: "0.8rem"}} /><Text className="kr" textAlign="center" fontSize={13} ml={1.5} >涼風 青葉</Text>
					</Flex>
				</Box>
			</Flex>
			<Center mt={4} justifyContent="space-around">
				<Button variant="outline" size="sm" colorScheme="green" leftIcon={<Image src="/classroom.svg" width={20} height={17}></Image>}>
					<a href="https://classroom.google.com/" target="_blank" rel="noopener noreferrer">Classroomを開く</a>
				</Button>
			</Center>
		</Box>
	)
}

export default NextClass