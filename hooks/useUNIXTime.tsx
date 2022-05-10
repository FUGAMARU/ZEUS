//React Hooks
import { useState, useEffect } from "react"

//Libraries
import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useUNIXTime = () => {
	const [localUNIXTime, setLocalUnixTime] = useState(0) //UNIXタイムスタンプ(1秒ごとに自動更新) 時刻取得中 => 0, 時刻取得エラー => -1
	const [isClockStarted, setClockStarted] = useState(false) //UNIXタイムスタンプのカウントアップがスタートしているか

	const { data, error } = useSWR("https://worldtimeapi.org/api/timezone/Asia/Tokyo", fetcher)

	useEffect(() => {
		if(data){
			console.log("UNIXタイムスタンプ新規受信")
			console.log(data.unixtime)
			if(isClockStarted === false){
				setLocalUnixTime(data.unixtime + 1)
				setClockStarted(true)
				setInterval(() => {
					setLocalUnixTime(prev => prev + 1)
				}, 1000)
			}else{
				setLocalUnixTime(data.unixtime + 1)
				console.log(`時刻合わせ完了 - ${new Date(data.unixtime * 1000).toString()}`)
			}
		}
	}, [data])

	useEffect(() => {
		if(error) setLocalUnixTime(-1)
	}, [error])

	return {
		localUNIXTime
	}
}

export default useUNIXTime