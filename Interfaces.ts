//コンポーネントやRecoilが持つユーザーデーター
export interface Userdata {
	uid: string,
	name: string,
	iconUrl: string,
	classID: string,
	className: string
}

//Firestoreにあるユーザーデーターのデーター構造
export interface FSUserdata {
	name: string,
	class: string,
	iconSrc?: string,
	message?: string,
	snsLinks?: string[]
}

//チャットメッセージ
export interface MessageObject{
	scope?: string
	type: string
	userName?: string,
	iconSrc?: string
	datetime: string,
	message: string
}

//クラスデーター
export interface Class {
	screenName: string,
	teachers: string[],
	hours: {
		mon: [string | null],
		tue: [string | null],
		wed: [string | null],
		thu: [string | null],
		fri: [string | null]
	}
}

//授業データー
export interface Lecture {
	name: string,
	teacher: string,
	location: string,
	hours: string,
	classroom: string,
	zoom: string
}

//Twitterトレンド
export interface TwitterTrends {
	trends: {
		name: string,
		url: string,
		tweet_volume: number
	}[],
	lastUpdate: string
}

//スレッドタイトル一覧
export interface ThreadHeadings {
	id: string,
	title: string,
	lastUpdate: number
}

//レスを表示するためにコンポーネント側で持つデーター
export interface Res {
	sentAt: number,
	text: string,
	userdata: {
		name: string,
		iconUrl: string
	}
}

//Firestoreのスレッドデーターのレス一覧のデーター構造
export interface Responses {
	uid: string,
	sentAt: number,
	text: string
}

//Firestoreにあるスレッド一覧のデーター構造
export interface Threads {
	createdAt: number,
	createdBy: string,
	lastUpdate: number,
	responses: Responses[],
	title: string
}