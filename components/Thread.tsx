//Chakra UI Components
import { Box, Flex, Text, VStack, Avatar, StackDivider, Textarea, Button, Tooltip } from "@chakra-ui/react"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"

interface Props {
	title: string,
	backToList: VoidFunction,
	id: string
}

const Thread = (props: Props) => {
	return(
		<Box>
			<Flex alignItems="center" justifyContent="space-between" px={3} pb={3} shadow="lg" position="relative" zIndex={10}>
				<FontAwesomeIcon icon={faAngleLeft} onClick={props.backToList} style={{height: "1.8rem", cursor: "pointer", color: "#4a4848"}}/>
				<Tooltip label={props.title}>
					<Text className="kr tpl" ml={2}>{props.title}</Text>
				</Tooltip>
				<FontAwesomeIcon icon={faArrowRotateRight} style={{height: "1.5rem", cursor: "pointer", color: "#4a4848"}}/>
			</Flex>

			<VStack bg="#efefef" h={{base: 350, md:314, lg: 350}} overflowY="auto" px={4} py={3} align="stretch" divider={<StackDivider borderColor="gray.200"/>} position="relative">
				<Box>
					<Flex>
						<Avatar src="/anonymous.png" size="sm"></Avatar>
						<Box ml={2}>
							<Text fontSize="0.7rem" ml={0} color="gray.500">ユーザー名・2022/03/18 19:00:05</Text>
							<Text className="kr" fontSize="0.85rem" mt={0} whiteSpace="pre-line">{"入院中や自宅療養以外で死ぬと警察が介入する\n状況にもよるが、大まかな流れとしては…"}</Text>
						</Box>	
					</Flex>
				</Box>

				<Box>
					<Flex>
						<Avatar src="https://pbs.twimg.com/profile_images/1141320836478930945/C0cCxuyc_400x400.jpg" size="sm"></Avatar>
						<Box ml={2}>
							<Text fontSize="0.7rem" ml={0} color="gray.500">やきう 兄貴・2022/03/18 19:00:05</Text>
							<Text className="kr" fontSize="0.85rem" mt={0} whiteSpace="pre-line">{"話してええことなんか？"}</Text>
						</Box>	
					</Flex>
				</Box>

				<Box>
					<Flex>
						<Avatar src="/anonymous.png" size="sm"></Avatar>
						<Box ml={2}>
							<Text fontSize="0.7rem" ml={0} color="gray.500">ユーザー名・2022/03/18 19:00:05</Text>
							<Text className="kr" fontSize="0.85rem" mt={0} whiteSpace="pre-line">{"むしろ話してみんなに知ってほしい"}</Text>
						</Box>	
					</Flex>
				</Box>

				<Box>
					<Flex>
						<Avatar src="/anonymous.png" size="sm"></Avatar>
						<Box ml={2}>
							<Text fontSize="0.7rem" ml={0} color="gray.500">ユーザー名・2022/03/18 19:00:05</Text>
							<Text className="kr" fontSize="0.85rem" mt={0} whiteSpace="pre-line">{"まず警察業者時代の話から\n23時くらいに社長から電話があった\n	｢大和駅近くの居酒屋に急いで行ってくれ｣…"}</Text>
						</Box>	
					</Flex>
				</Box>

				<Box>
					<Flex>
						<Avatar src="https://pbs.twimg.com/profile_images/1141320836478930945/C0cCxuyc_400x400.jpg" size="sm"></Avatar>
						<Box ml={2}>
							<Text fontSize="0.7rem" ml={0} color="gray.500">やきう 兄貴・2022/03/18 19:00:05</Text>
							<Text className="kr" fontSize="0.85rem" mt={0} whiteSpace="pre-line">{"流石に嘘やろ"}</Text>
						</Box>	
					</Flex>
				</Box>

				<Box>
					<Flex>
						<Avatar src="https://i-ogp.pximg.net/c/540x540_70/img-master/img/2021/01/09/23/55/50/86938456_p0_square1200.jpg" size="sm"></Avatar>
						<Box ml={2}>
							<Text fontSize="0.7rem" ml={0} color="gray.500">お前 モナー・2022/03/18 19:00:05</Text>
							<Text className="kr" fontSize="0.85rem" mt={0} whiteSpace="pre-line">{"消されそう"}</Text>
						</Box>	
					</Flex>
				</Box>

			</VStack>

			<Box>
				<Textarea placeholder="テキストを入力…" size="xs" />
				<Button size="xs" w="100%">送信する</Button>
			</Box>
		</Box>
	)
}

export default Thread