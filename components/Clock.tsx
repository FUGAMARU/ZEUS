//React Hooks
import { useState, useEffect, useRef } from "react"

//Custom Hooks
import { useResponsive } from "../hooks/useResponsive"
import useTokyoWeather from "../hooks/useTokyoWeather"
import useMuroranWeather from "../hooks/useMuroranWeather"

//Chakra UI Components
import { Box, Flex, Center, Text, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, VStack, StackDivider } from '@chakra-ui/react'

interface Props {
	unixTime: number
}

const Clock = (props: Props) => {
	const responsiveType = useResponsive() //リアクティブな画面幅タイプの変数
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
	const popoverRef = useRef(null)
	const [weatherLocationFlag, setWeatherLocationFlag] = useState(true) //天気予報の地点切り替え用変数(True => 東京, False => 室蘭)
	const { tokyoWeather, isTokyoWeatherLoading, isTokyoWeatherError } = useTokyoWeather()
	const { muroranWeather, isMuroranWeatherLoading, isMuroranWeatherError } = useMuroranWeather()
	const [weatherClassNames, setWeatherClassNames] = useState("")
	const [weatherIconUrl, setWeatherIconUrl] = useState("")
	const [weatherTelop, setWeatherTelop] = useState("")
	const [temp, setTemp] = useState("")

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
		const d = new Date(props.unixTime * 1000)
		setDatetime({
			year: d.getFullYear(),
			month: d.getMonth() + 1,
			date: d.getDate(),
			day: dayOfWeek[d.getDay()],
			hour: d.getHours(), 
			minute: ("00" + d.getMinutes()).slice(-2), //ゼロパディングも忘れずに！
			second: ("00" + d.getSeconds()).slice(-2)
		})
	}, [props.unixTime])

	useEffect(() => {
		if(tokyoWeather){
			console.log("天気情報取得完了(東京)")
			console.log(tokyoWeather)
			if(weatherLocationFlag){
				setWeatherIconUrl(tokyoWeather.forecasts[0].image.url)
				setWeatherTelop(tokyoWeather.forecasts[0].telop)
				setTemp(tokyoWeather.forecasts[0].temperature.max.celsius)
			}
		}
	}, [tokyoWeather])

	useEffect(() => {
		if(muroranWeather){
			console.log("天気情報取得完了(室蘭)")
			console.log(muroranWeather)
			if(!(weatherLocationFlag)){
				setWeatherIconUrl(muroranWeather.forecasts[0].image.url)
				setWeatherTelop(muroranWeather.forecasts[0].telop)
				setTemp(muroranWeather.forecasts[0].temperature.max.celsius)
			}
		}
	}, [muroranWeather])	

	useEffect(() => {
		if(tokyoWeather && muroranWeather){
			setWeatherClassNames("animate__animated animate__flipOutX animate__fast")
			setTimeout(() => {
				if(weatherLocationFlag){
					localStorage["weatherLocation"] = "tokyo"
					setWeatherIconUrl(tokyoWeather.forecasts[0].image.url)
					setWeatherTelop(tokyoWeather.forecasts[0].telop)
					setTemp(tokyoWeather.forecasts[0].temperature.max.celsius)
				}else{
					localStorage["weatherLocation"] = "muroran"
					setWeatherIconUrl(muroranWeather.forecasts[0].image.url)
					setWeatherTelop(muroranWeather.forecasts[0].telop)
					setTemp(muroranWeather.forecasts[0].temperature.max.celsius)
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
						{isTokyoWeatherLoading || isMuroranWeatherLoading ? <Text className="kb">天気情報取得中</Text> : isTokyoWeatherError || isMuroranWeatherError ? <Text className="kb">天気情報取得エラー</Text> : 
							<Flex className={weatherClassNames} alignItems="center" justifyContent="center">
								<img src={weatherIconUrl} style={{height: "2.3rem"}}></img>
								<Text className="kb" ml={2} fontSize={{base: "1.3rem", md: "1.2rem", lg: "1.2rem"}}>{weatherTelop}</Text>
								<Text className="ksb" color="red" ml={2} fontSize={{base: "1.1rem", md: "1rem", lg: "1rem"}}>{temp}℃</Text>
							</Flex>
						}
					</PopoverHeader>
					<PopoverBody pl={0}>
						<Box className="kb" fontSize="1.1rem" color="white" display="inline-block" px={5} mb={2} bg="linear-gradient(90deg, rgba(32,156,255,1) 0%, rgba(104,224,207,1) 100%)">#トレンド</Box>
						<VStack align="stretch" divider={<StackDivider borderColor="gray.200"/>}>
							<a href="https://twitter.com/search?q=%23ZETAWIN&src=trend_click&vertical=trends" target="_blank" rel="noopener noreferrer"><Text className="ksb" pl={4}>1. #ZETAWIN</Text></a>
							<a href="https://twitter.com/search?q=%E3%82%B7%E3%83%A3%E3%83%B3%E3%82%AF%E3%82%B9%E3%81%AE%E5%A8%98&src=trend_click&pt=1514000519198801922&vertical=trends" target="_blank" rel="noopener noreferrer"><Text className="ksb" pl={4}>2. シャンクスの娘</Text></a>
							<a href="https://twitter.com/search?q=Laz%E3%81%95%E3%82%93&src=trend_click&vertical=trends" target="_blank" rel="noopener noreferrer"><Text className="ksb" pl={4}>3. #Lazさん</Text></a>
						</VStack>
					</PopoverBody>
				</PopoverContent>
			</>
			)}
		</Popover>
	)
}

export default Clock