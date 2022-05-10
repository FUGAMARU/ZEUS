const getTimestamp = (unixTime: number) => {
	const datetime = new Date(unixTime * 1000)
	const hour = datetime.getHours().toString()
	const minute = ("00" + datetime.getMinutes()).slice(-2).toString()
	return Number(hour + minute)
}

//今が何時限目か判定する
const whattimeIsIt = (unixTime: number) => {
	const time = getTimestamp(unixTime)

	if(time >= 930 && time < 1015){
		return 1
	}else if(time >= 1015 && time < 1100){
		return 2
	}else if(time >= 1110 && time < 1155){
		return 3
	}else if(time >= 1155 && time < 1240){
		return 4
	}else if(time >= 1330 && time < 1415){
		return 5
	}else if(time >= 1415 && time < 1500){
		return 6
	}else if(time >= 1510 && time < 1555){
		return 7
	}else if(time >= 1555 && time < 1640){
		return 8
	}else{
		return 0
	}
}

//残り時間を計算する
const getRemainingTime = (unixTime: number) => {
	const currentLecture = whattimeIsIt(unixTime)

	const unixToHours = new Date(unixTime * 1000).getHours()
	const unixToMinutes = new Date(unixTime * 1000).getMinutes()
	
	const t1 = new Date(`2022/05/04 ${unixToHours}:${unixToMinutes}:00`)
	let t2: Date|null

	switch(currentLecture){
		case 1:
			t2 = new Date("2022/05/04 10:15:00")
			break
		case 2:
			t2 = new Date("2022/05/04 11:00:00")
			break
		case 3:
			t2 = new Date("2022/05/04 11:55:00")
			break
		case 4:
			t2 = new Date("2022/05/04 12:40:00")
			break
		case 5:
			t2 = new Date("2022/05/04 14:15:00")
			break
		case 6:
			t2 = new Date("2022/05/04 15:00:00")
			break
		case 7:
			t2 = new Date("2022/05/04 15:55:00")
			break
		case 8:
			t2 = new Date("2022/05/04 16:40:00")
			break
		default:
			t2 = null
			break
	}

	if(t2 === null){
		return -1
	}else{
		const diff = t2.getTime() - t1.getTime()
		const diffHour = diff / (1000 * 60 * 60)
		const diffMinute = Math.floor((diffHour - Math.floor(diffHour)) * 60)
		return diffMinute
	}
}

export { getTimestamp, whattimeIsIt, getRemainingTime }