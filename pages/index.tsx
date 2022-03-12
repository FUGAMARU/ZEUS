//React Hooks
import { useEffect, useState, useRef, useContext } from 'react'

//Custom Hooks
import { useResponsive } from '../hooks/useResponsive'

//Next.js Components
import Head from 'next/head'
import type { NextPage } from 'next'
import Image from 'next/image'

//Chakra UI Components
import { Container, Box, Center, SimpleGrid, Text } from '@chakra-ui/react'

//Custom Components
import Clock from '../components/Clock'
import UserInfo from '../components/UserInfo'
import CurrentClass from '../components/CurrentClass'
import NextClass from '../components/NextClass'

//Libraries
import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json());

//Contexts
import { SocketContext } from '../contexts/SocketIO'

const Home:NextPage = () => {
	const [unixTime, setUnixTime] = useState(0) //UNIXタイムスタンプ(1秒ごとに自動更新)
	const [isClockStarted, setClockStarted] = useState(false) //UNIXタイムスタンプのカウントアップがスタートしているか
	const refUNIX = useRef(unixTime)
	const socket = useContext(SocketContext) //Socket.IOオブジェクトのContext
	
	const { data, error } = useSWR("https://worldtimeapi.org/api/timezone/Asia/Tokyo", fetcher);

	useEffect(() => {
		const unixChecker = setInterval(() => {
			//console.log(refUNIX.current)
		}, 1000)

		return () => {
			clearInterval(unixChecker)
		}
	}, [])

	useEffect(() => {
		socket.on("connection", (res: string) => {
			console.log("WebSocket接続完了！")
			console.log(res)
		})
	}, [socket])

	useEffect(() => {
		refUNIX.current = unixTime
	}, [unixTime])

	useEffect(() => {
		console.log("新規時刻データー受信")
		console.log(data)
		if(data !== undefined){
			if(isClockStarted === false){
				setUnixTime(data.unixtime + 1)
				setClockStarted(true)
				setInterval(() => {
					setUnixTime(prev => prev + 1)
				}, 1000)
			}else{
				setUnixTime(data.unixtime + 1)
				console.log(`時刻合わせ完了 - ${new Date(data.unixtime * 1000).toString()}`)
			}
		}
	}, [data])

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
						{!error ? <Clock unixTime={unixTime}/> : <p className="kb">時刻情報再取得中…</p>}
					</Center>
					<Center>
						<Image src="/zeus.svg" width={269} height={70} />
					</Center>
					<Center>
						<UserInfo />
					</Center>	
				</SimpleGrid>

				<SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={5} my={10} mx={3}>
					<CurrentClass />
					<NextClass />
					<Box bg="orange.300">FileDispenser</Box>
					<Box bg="yellow.300">チャット</Box>
					<Box bg="purple.300">BBS</Box>
					<Box bg="cyan.300">お知らせ</Box>
					<Box bg="teal.300">やること</Box>
				</SimpleGrid>

				<Center bg="gray.300">フッター</Center>
				<Text>{`Responsive: ${useResponsive()}`}</Text>
			</Container>
			
			<Box position="absolute" bottom={{base: 5, md: 19, lg: 30}} right={{base: 5, md: 19, lg: 30}} height={{base: 120, md: 160, lg: 200}} width={{base: 86, md: 114, lg: 143}} style={{transform: "rotate(15deg)"}}>
				<Image src="/pacchixi.png" layout="fill" />
			</Box>
		</Box>
	)
}

export default Home