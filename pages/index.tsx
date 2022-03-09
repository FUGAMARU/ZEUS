import Head from 'next/head'
import type { NextPage } from 'next'

import { Container, Box, Center, SimpleGrid, Flex } from '@chakra-ui/react'

const Home: NextPage = () => {
	return (
		<Box minHeight="100vh" bg="#e3e3e3">
			<Head>
				<title>ZEUS</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{/*base => スマホ / md => タブレット / lg => PC*/}
			<Container maxW="1280px" px={{base: "0px", md: "0.5rem", lg: "auto"}}>
				<SimpleGrid columns={3} spacing={0}>
					<Center bg="purple.300">
						日付
					</Center>
					<Center bg="cyan.300">
						ZEUSロゴ
					</Center>
					<Center bg="teal.300">
						ユーザー情報
						{/*スマホ表示のときはアイコンだけ、PC・タブレット表示のときは名前も*/}
					</Center>	
				</SimpleGrid>

				<SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={5} my={10}>
					<Box bg="blue.300">現在進行中の授業</Box>
					<Box bg="red.300">次の授業</Box>
					<Box bg="orange.300">FileDispenser</Box>
					<Box bg="yellow.300">チャット</Box>
					<Box bg="purple.300">BBS</Box>
					<Box bg="cyan.300">お知らせ</Box>
					<Box bg="teal.300">やること</Box>
				</SimpleGrid>

				<Center bg="gray.300">フッター</Center>
				
			</Container>
		</Box>
	)
}

export default Home
