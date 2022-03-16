//Chakra UI Components
import { Box, Flex, Button, ButtonGroup, Center, Input, IconButton } from '@chakra-ui/react'

//Custom Components
import ChatBalloon from './ChatBalloon'

//Libraries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Chat = () => {
	return(
		<Box mx={2}>
			<Center py={2} bg="#283148" borderTopRadius={10}>
				<ButtonGroup size="xs" colorScheme="whiteAlpha" isAttached>
					<Button variant="solid">クラス</Button>
					<Button variant="outline">グローバル</Button>
				</ButtonGroup>				
			</Center>

			<Box bg="#7992c0" h={320} pt={3} overflow="auto">
				<ChatBalloon type="other" message="もじゃもじゃ？" userName="ココアさん" time="15:12" profileIconSrc="https://hominis.media/2018/06/images/03_gochiusa.jpg" />
				<ChatBalloon type="me" message="これですか？" time="15:12" />
				<ChatBalloon type="me" message="これはティッピーです。一応ウサギです。" time="15:12" />
				<ChatBalloon type="other" message="ウサギ～？" userName="ココアさん" time="15:12" profileIconSrc="https://hominis.media/2018/06/images/03_gochiusa.jpg" />
				<ChatBalloon type="me" message="ご注文は…？" time="15:12" />
				<ChatBalloon type="other" message="じゃあ、そのウサギさん！" userName="ココアさん" time="15:12" profileIconSrc="https://hominis.media/2018/06/images/03_gochiusa.jpg" />
				<ChatBalloon type="me" message="非売品です" time="15:12" />
				<ChatBalloon type="other" message="せめてモフモフさせて！" userName="ココアさん" time="15:12" profileIconSrc="https://hominis.media/2018/06/images/03_gochiusa.jpg" />
				<ChatBalloon type="me" message="コーヒー1杯で1回です" time="15:12" />
				<ChatBalloon type="other" message="じゃあ3杯！！！" userName="ココアさん" time="15:12" profileIconSrc="https://hominis.media/2018/06/images/03_gochiusa.jpg" />
				<ChatBalloon type="me" message="複数行のテキスト。複数行のテキスト。複数行のテキスト。複数行のテキスト。複数行のテキスト。複数行のテキスト。複数行のテキスト。複数行のテキスト。" time="15:12" />
				<ChatBalloon type="other" message="複数行のテキスト。複数行のテキスト。複数行のテキスト。複数行のテキスト。複数行のテキスト。複数行のテキスト。複数行のテキスト。複数行のテキスト。" userName="ココアさん" time="15:12" profileIconSrc="https://hominis.media/2018/06/images/03_gochiusa.jpg" />
			</Box>

			<Flex alignItems="center" bg="#f1f4f9" p={2} borderBottomRadius={10}>
				<Input size="sm" placeholder="(Enterで送信)" bg="white" borderRadius={10} mr={2} />
				<IconButton colorScheme="blue" aria-label="送信" height={8} icon={<FontAwesomeIcon icon={faPaperPlane} />} />
			</Flex>
		</Box>
	)
}

export default Chat