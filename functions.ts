import moment from "moment"

const getTimestamp = (unixTime: number) => {
	const datetime = new Date(unixTime * 1000)
	const hour = datetime.getHours().toString()
	const minute = ("00" + datetime.getMinutes()).slice(-2).toString()
	return Number(hour + minute)
}

//今が何時限目か判定する
const whattimeIsIt = (unixTime: number, target: string) => {
	const time = getTimestamp(unixTime)

	if(target === "current") {
		if( time >= 830 && time < 930){
			return 0
		}else if(time >= 930 && time < 1015){
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
			return -1
		}
	}else{
		if( time >= 830 && time < 930){
			return 0
		}else if(time >= 930 && time < 1015){
			return 1
		}else if(time >= 1015 && time < 1110){
			return 2
		}else if(time >= 1110 && time < 1155){
			return 3
		}else if(time >= 1155 && time < 1330){
			return 4
		}else if(time >= 1330 && time < 1415){
			return 5
		}else if(time >= 1415 && time < 1510){
			return 6
		}else if(time >= 1510 && time < 1555){
			return 7
		}else if(time >= 1555 && time < 1640){
			return 8
		}else{
			return -1
		}
	}
}

//残り時間を計算する
const getRemainingTime = (unixTime: number, target: string) => {
	const currentLecture = whattimeIsIt(unixTime,target)

	const unixToHours = new Date(unixTime * 1000).getHours()
	const unixToMinutes = new Date(unixTime * 1000).getMinutes()
	
	const t1 = new Date(`2022/05/04 ${unixToHours}:${unixToMinutes}:00`)
	let t2: Date|null

	switch(currentLecture){
		case 0:
			t2 = target === "current" ? null : new Date("2022/05/04 09:30:00")
			break
		case 1:
			t2 = target === "current" ? new Date("2022/05/04 10:15:00") : new Date("2022/05/04 10:15:00")
			break
		case 2:
			t2 = target === "current" ? new Date("2022/05/04 11:00:00") : new Date("2022/05/04 11:10:00")
			break
		case 3:
			t2 = target === "current" ? new Date("2022/05/04 11:55:00") : new Date("2022/05/04 11:55:00")
			break
		case 4:
			t2 = target === "current" ? new Date("2022/05/04 12:40:00") : new Date("2022/05/04 13:30:00")
			break
		case 5:
			t2 = target === "current" ? new Date("2022/05/04 14:15:00") : new Date("2022/05/04 14:15:00")
			break
		case 6:
			t2 = target === "current" ? new Date("2022/05/04 15:00:00") : new Date("2022/05/04 15:10:00")
			break
		case 7:
			t2 = target === "current" ? new Date("2022/05/04 15:55:00") : new Date("2022/05/04 15:55:00")
			break
		case 8:
			t2 = target === "current" ? new Date("2022/05/04 16:40:00") : null
			break
		default:
			t2 = null
			break
	}

	if(t2 === null){
		return t2
	}else{
		const diff = t2.getTime() - t1.getTime()
		return Math.floor(diff / 1000 / 60)
	}
}

const escapeHTML = (str: string) => {
    return str.replace(/&/g, "&lt;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}

const timeAgo = (from: number, to: number) => {
	const diff = to - from
	const momentFrom = moment(from * 1000)
	const momentTo = moment(to * 1000)

	if(diff <= 60){
		return "1分以内"
	}else if(diff <= 3600){
		return `${Math.abs(momentFrom.diff(momentTo, "minutes"))}分前`
	}else if(diff <= 86400){
		return `${Math.abs(momentFrom.diff(momentTo, "hours"))}時間前`
	}else if(diff <= 604800){
		return `${Math.abs(momentFrom.diff(momentTo, "days"))}日前`
	}else if(diff <= 2592000){
		return `${Math.abs(momentFrom.diff(momentTo, "weeks"))}週間前`
	}else if(diff <= 31536000){
		return `${Math.abs(momentFrom.diff(momentTo, "months"))}ヶ月前`
	}else{
		return `${Math.abs(momentFrom.diff(momentTo, "years"))}年前`
	}
}

export { getTimestamp, whattimeIsIt, getRemainingTime, escapeHTML, timeAgo }