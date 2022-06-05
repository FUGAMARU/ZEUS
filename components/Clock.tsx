//React Hooks
import { useState, useEffect, useRef } from "react"

//Custom Hooks
import { useResponsive } from "../hooks/useResponsive"

//Chakra UI Components
import { Box, Flex, Center, Text, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, VStack, StackDivider } from '@chakra-ui/react'

//Libraries
import useSWR from "swr"
import useSWRImmutable from "swr/immutable"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Props {
	UNIXTime: number
}

interface TwitterTrends {
	trends: {
		name: string,
		url: string,
		tweet_volume: number
	}[],
	lastUpdate: string
}

const Clock = (props: Props) => {
	const responsiveType = useResponsive() //リアクティブな画面幅タイプの変数
	const popoverRef = useRef(null)
	const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"] //曜日番号から文字へ変換する用の配列
	const [datetime, setDatetime] = useState({
		year: 2000, //西暦
		month: 0, //月
		date: 1, //日
		day: "0", //曜日
		hour: 0, //時
		minute: "0", //分
		second: "0" //秒
	})
	const [weatherLocationFlag, setWeatherLocationFlag] = useState(true) //天気予報の地点切り替え用変数(True => 東京, False => 室蘭)
	const [weatherClassNames, setWeatherClassNames] = useState("")
	const [weather, setWeather] = useState({
		iconUrl: "",
		telop: "",
		temp: ""
	})
	const [twitterTrends, setTwitterTrends] = useState<TwitterTrends>({trends: [{name: "Trend1", url: "https://twitter.com", tweet_volume: 0}, {name: "Trend2", url: "https://twitter.com", tweet_volume: 0}, {name: "Trend3", url: "https://twitter.com", tweet_volume: 0}], lastUpdate: ""})

	const { data: swrTwitterTrendsData, error: swrTwitterTrendsError } = useSWR(process.env.NEXT_PUBLIC_TWITTER_TRENDS_ADDRESS, fetcher, { refreshInterval: 60000 })
	const { data: tokyoWeather, error: tokyoWeatherError } = useSWRImmutable("https://weather.tsukumijima.net/api/forecast/city/130010", fetcher)
	const { data: muroranWeather, error: muroranWeatherError } = useSWRImmutable("https://weather.tsukumijima.net/api/forecast/city/015010", fetcher)

	useEffect(() => {
		if(swrTwitterTrendsData){
			console.log("Twitterトレンドを取得しました")
			console.log(swrTwitterTrendsData)
			setTwitterTrends(swrTwitterTrendsData)
		}
		if(swrTwitterTrendsError){
			console.log("Twitterトレンド取得エラー")
		}
	}, [swrTwitterTrendsData, swrTwitterTrendsError])

	useEffect(() => {
		//LocalStorageから天気予報の地点を読み込んでstateに反映
		console.log("地点： " + localStorage["weatherLocation"])
		if(localStorage["weatherLocation"] === "tokyo"){
			setWeatherLocationFlag(true)
		}else{
			setWeatherLocationFlag(false)
		}		
	}, [])

	useEffect(() => {
		//unixTime(親コンポーネントのstate)が更新されたらオブジェクトのフォーマットに合わせて更新する
		const d = new Date(props.UNIXTime * 1000)
		setDatetime({
			year: d.getFullYear(),
			month: d.getMonth() + 1,
			date: d.getDate(),
			day: dayOfWeek[d.getDay()],
			hour: d.getHours(), 
			minute: ("00" + d.getMinutes()).slice(-2), //ゼロパディングも忘れずに！
			second: ("00" + d.getSeconds()).slice(-2)
		})
	}, [props.UNIXTime])

	useEffect(() => {
		if(tokyoWeather){
			console.log("天気情報取得完了(東京)")
			console.log(tokyoWeather)
			if(weatherLocationFlag){
				setWeather({
					iconUrl: tokyoWeather.forecasts[0].image.url,
					telop: tokyoWeather.forecasts[0].telop,
					temp: tokyoWeather.forecasts[0].temperature.max.celsius
				})
			}
		}
	}, [tokyoWeather])

	useEffect(() => {
		if(muroranWeather){
			console.log("天気情報取得完了(室蘭)")
			console.log(muroranWeather)
			if(!(weatherLocationFlag)){
				setWeather({
					iconUrl: muroranWeather.forecasts[0].image.url,
					telop: muroranWeather.forecasts[0].telop,
					temp: muroranWeather.forecasts[0].temperature.max.celsius
				})
			}
		}
	}, [muroranWeather])	

	useEffect(() => {
		if(tokyoWeather && muroranWeather){
			setWeatherClassNames("animate__animated animate__flipOutX animate__fast")
			setTimeout(() => {
				if(weatherLocationFlag){
					localStorage["weatherLocation"] = "tokyo"
					setWeather({
						iconUrl: tokyoWeather.forecasts[0].image.url,
						telop: tokyoWeather.forecasts[0].telop,
						temp: tokyoWeather.forecasts[0].temperature.max.celsius
					})
				}else{
					localStorage["weatherLocation"] = "muroran"
					setWeather({
						iconUrl: muroranWeather.forecasts[0].image.url,
						telop: muroranWeather.forecasts[0].telop,
						temp: muroranWeather.forecasts[0].temperature.max.celsius
					})
				}
				setWeatherClassNames("animate__animated animate__flipInX animate__fast")
			}, 800)
		}
	}, [weatherLocationFlag])

	return(
		<Popover initialFocusRef={popoverRef}>
			{({ isOpen }) => (
			<>
				<PopoverTrigger>
					<Box px={{base: 4, md: 6, lg: 8}} py={2} borderRadius={25} cursor="pointer" transition="0.4s all ease-out" _hover={{bg: "#f5f5f5", boxShadow: "5px 5px 11px #dedede, -5px -5px 11px #ffffff"}} style={isOpen ? {backgroundColor: "#f5f5f5", boxShadow: "5px 5px 11px #dedede, -5px -5px 11px #ffffff"} : {}}>
						{responsiveType === "SmartPhone" && <p className="kb" style={{fontSize: "0.95rem"}}>{`${datetime.month}/${datetime.date}`}&nbsp;{`${datetime.hour}:${datetime.minute}`}</p>}
						{responsiveType === "Tablet" && <p className="kb">{`${datetime.year}年${datetime.month}月${datetime.date}日(${datetime.day}) ${datetime.hour}:${datetime.minute}`}</p>	}
						{responsiveType === "PC" && <p className="kb" style={{fontSize: "1.1rem"}}>{`${datetime.year}年${datetime.month}月${datetime.date}日(${datetime.day}) ${datetime.hour}:${datetime.minute}`}</p>}
						<hr className="clock-hr" />
					</Box>
				</PopoverTrigger>
				<PopoverContent borderRadius={15}>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverHeader className="kb" fontSize="1.3rem">世界宇宙飛行の日</PopoverHeader>
					<PopoverHeader>
						<Center>
							<Text className="kr" borderLeftRadius={20} fontSize={{base: "0.8rem", md: "0.7rem", lg: "0.7rem"}} px={2} bg={weatherLocationFlag ? "black" : "white"} color={weatherLocationFlag ? "white" : "black"} cursor={weatherLocationFlag ? "default" : "pointer"} _hover={weatherLocationFlag ? {bg: "black"} : {bg: "#f0f0f0"}} onClick={() => setWeatherLocationFlag(!weatherLocationFlag)}>東京</Text>
							<Text className="kr" borderRightRadius={20} fontSize={{base: "0.8rem", md: "0.7rem", lg: "0.7rem"}} px={2} bg={weatherLocationFlag ? "white" : "black"} color={weatherLocationFlag ? "black" : "white"} cursor={weatherLocationFlag ? "pointer" : "default"} _hover={weatherLocationFlag ? {bg: "#f0f0f0"} : {bg: "black"}} onClick={() => setWeatherLocationFlag(!weatherLocationFlag)}>室蘭</Text>
						</Center>
						{tokyoWeather || muroranWeather ?
							<Flex className={weatherClassNames} alignItems="center" justifyContent="center">
								<img src={weather.iconUrl} style={{height: "2.3rem"}}></img>
								<Text className="kb" ml={2} fontSize={{base: "1.3rem", md: "1.2rem", lg: "1.2rem"}}>{weather.telop}</Text>
								{weather.temp !== null ? <Text className="ksb" color="red" ml={2} fontSize={{base: "1.1rem", md: "1rem", lg: "1rem"}}>{weather.temp}℃</Text> : ""}
							</Flex>
						: tokyoWeatherError || muroranWeatherError ? <Text className="kb">天気情報取得エラー</Text> : <Text className="kb">天気情報取得中</Text>}
					</PopoverHeader>
					<PopoverBody pl={0}>
						<Flex mb={2} justifyContent="space-between" alignItems="flex-end">
							<Box className="kb" fontSize="1.1rem" color="white" display="inline-block" px={5} bg="linear-gradient(90deg, rgba(32,156,255,1) 0%, rgba(104,224,207,1) 100%)">#トレンド</Box>
							<Text className="kr" fontSize={{base: "0.6rem", md: "0.6rem", lg: "0.5rem"}} textDecoration="underline" color="#808080">最終更新 {twitterTrends?.lastUpdate}</Text>
						</Flex>
						<VStack align="stretch" divider={<StackDivider borderColor="gray.200"/>}>
							{twitterTrends.trends.map((obj, idx) => {
								return (
									<Flex key={idx} alignItems="flex-end">
										<a href={obj.url} target="_blank" rel="noopener noreferrer">
											<Text className="ksb" pl={4}>{idx + 1}. #{obj.name.replace(/#/, "")}</Text>
										</a>
										<Text className="kr" fontSize={{base: "0.6rem", md: "0.6rem", lg: "0.5rem"}} ml={2} mb="0.15rem" fontStyle="italic" textDecoration="underline" color="#808080">{obj.tweet_volume}ツイート</Text>
									</Flex>
								)
							})}
						</VStack>
					</PopoverBody>
				</PopoverContent>
			</>
			)}
		</Popover>
	)
}

export default Clock