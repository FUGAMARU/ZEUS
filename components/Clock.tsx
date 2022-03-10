//React Hooks
import { useState, useEffect } from "react"

//Custom Hooks
import { useResponsive } from "../hooks/useResponsive"

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

	return(
		<div>
			{responsiveType === "SmartPhone" ? <p className="kb" style={{fontSize: "0.95rem"}}>{`${datetime.month}/${datetime.date}(${datetime.day}) ${datetime.hour}:${datetime.minute}`}</p> : null}
			{responsiveType === "Tablet" ? <p className="kb">{`${datetime.year}年${datetime.month}月${datetime.date}日(${datetime.day}) ${datetime.hour}:${datetime.minute}`}</p> : null}
			{responsiveType === "PC" ? <p className="kb" style={{fontSize: "1.1rem"}}>{`${datetime.year}年${datetime.month}月${datetime.date}日(${datetime.day}) ${datetime.hour}:${datetime.minute}`}</p> : null}
			<hr className="clock-hr" />
		</div>
	)
}

export default Clock