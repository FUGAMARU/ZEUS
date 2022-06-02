//React Hooks
import { useState, useEffect, useContext } from "react"

//Chakra UI Components
import { Box, Flex, Button, ButtonGroup, Center, Input, IconButton } from "@chakra-ui/react"

//Custom Components
import ChatBalloon from "./ChatBalloon"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

//Contexts
import { SocketContext } from "../contexts/SocketIO"

interface Props {
	ClassID: string,
	userName: string,
	iconSrc: string
}

interface MessageObject{
	scope?: string
	type: string
	userName?: string,
	iconSrc?: string
	datetime: string,
	message: string
}

const Chat = (props: Props) => {
	const socket = useContext(SocketContext) //Socket.IOオブジェクトのContext
	const [classChat, setClassChat] = useState<MessageObject[]>([])
	const [globalChat, setGlobalChat] = useState<MessageObject[]>([])
	const [chatScope, setChatScope] = useState(true) //True => クラスチャット, False => グローバルチャット
	const [message, setMessage] = useState("")

	useEffect(() => {
		console.log("==========Socketオブジェクト変更あり==========")
		console.log(socket)
		if(socket && socket.connected && !!!socket.disconnected) socket.emit("register", props.ClassID)

		socket.on("welcome", () => {
			socket.emit("register", props.ClassID)
		})

		socket.on("receiveMessage", (obj: MessageObject) => {
			console.log(`新規メッセージ受信 ${JSON.stringify(obj)}`)
			if(`${obj.userName}${obj.iconSrc}` === `${props.userName}${props.iconSrc}`){ //WebSocketサーバーから送られてきたメッセージが自分のものだったら(名前とアイコンのURLを合わせたもので判定)
				if(obj.scope === "global"){
					setGlobalChat(prevArr => [...prevArr, {
						type: "me",
						datetime: obj.datetime,
						message: obj.message
					}])
				}else if(obj.scope === "class"){
					setClassChat(prevArr => [...prevArr, {
						type: "me",
						datetime: obj.datetime,
						message: obj.message
					}])
				}
			}else{
				if(obj.scope === "global"){
					setGlobalChat(prevArr => [...prevArr, {
						type: "other",
						datetime: obj.datetime,
						message: obj.message,
						userName: obj.userName,
						iconSrc: obj.iconSrc
					}])
				}else if(obj.scope === "class"){
					setClassChat(prevArr => [...prevArr, {
						type: "other",
						datetime: obj.datetime,
						message: obj.message,
						userName: obj.userName,
						iconSrc: obj.iconSrc
					}])
				}
			}
		})
	}, [])

	socket.on("connect", () => { if(socket.id) socket.emit("register", props.ClassID) })

	const sendMessage = () => {
		if(chatScope){
			socket.emit("sendMessage", {
				scope: "class",
				classID: props.ClassID,
				userName: props.userName,
				iconSrc: props.iconSrc,
				message: message
			})
		}else{
			socket.emit("sendMessage", {
				scope: "global",
				userName: props.userName,
				iconSrc: props.iconSrc,
				message: message
			})
		}
		setMessage("")
	}

	return(
		<Box mx={2}>
			<Center py={2} bg="#283148" borderTopRadius={10}>
				<ButtonGroup size="xs" colorScheme="whiteAlpha" isAttached>
					<Button variant={chatScope ? "solid": "outline"} onClick={() => setChatScope(true)}>クラス</Button>
					<Button variant={chatScope ? "outline" : "solid"} onClick={() => setChatScope(false)}>グローバル</Button>
				</ButtonGroup>
			</Center>

			<Box bg="#7992c0" h={425} pt={3} overflow="auto">
				{chatScope ?
					classChat.map((obj, idx) => {
						return obj.type === "me" ? <ChatBalloon key={idx} type="me" message={obj.message} time={obj.datetime} /> : <ChatBalloon key={idx} type="other" message={obj.message} time={obj.datetime} userName={obj.userName} profileIconSrc={obj.iconSrc} />
					})
				: 
					globalChat.map((obj, idx) => {
						return obj.type === "me" ? <ChatBalloon key={idx} type="me" message={obj.message} time={obj.datetime} /> : <ChatBalloon key={idx} type="other" message={obj.message} time={obj.datetime} userName={obj.userName} profileIconSrc={obj.iconSrc} />
					})
				}
			</Box>

			<Flex alignItems="center" bg="#f1f4f9" p={2} borderBottomRadius={10}>
				<Input value={message} size="sm" placeholder="Aa" onChange={(e) => {setMessage(e.target.value);e.preventDefault()}} onKeyPress={(e) => { if(e.key === "Enter"){sendMessage();e.preventDefault()} }} bg="white" borderRadius={10} mr={2} />
				<IconButton colorScheme="blue" aria-label="送信" height={8} icon={<FontAwesomeIcon icon={faPaperPlane} />} onClick={() => sendMessage()} />
			</Flex>
		</Box>
	)
}

export default Chat