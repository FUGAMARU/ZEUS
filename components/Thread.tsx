//React Hooks
import { useState, useEffect, useRef } from "react"

//Chakra UI Components
import { Box, Flex, Text, VStack, Avatar, StackDivider, Textarea, Button, Tooltip, Spinner } from "@chakra-ui/react"

//Libraries
import { getResponses, getUserData, postRes } from "../firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons"
import moment from "moment"

//Global State Management
import { useRecoilValue } from "recoil"
import { UserdataAtom } from "../atoms/UserdataAtom"
import { RecoilUNIXTime } from "../atoms/UNXITimeAtom"

//Interfaces
import { Res, Responses } from "../Interfaces"

interface Props {
  title: string,
  backToList: VoidFunction,
  id: string
}

const Thread = (props: Props) => {
  const userdata = useRecoilValue(UserdataAtom)
  const UNIXTime = useRecoilValue(RecoilUNIXTime)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [responses, setResponses] = useState<Res[] | null>(null)
  const [isLoading, setLoading] = useState(true) //BBSのレス一覧の読み込みが完了したか

  useEffect(() => {
    (async () => {
      if (props.id) {
        setLoading(true)
        setResponses(null)
        const res: Responses[] = await getResponses(props.id)
        let tmpResponses: Res[] = []
        res.forEach(async (v: Responses) => {
          const res2 = await getUserData(v.uid)
          tmpResponses.push({
            sentAt: v.sentAt as number,
            text: v.text as string,
            userdata: {
              name: res2.name,
              iconUrl: res2.iconSrc as string
            }
          })
        })
        setResponses(tmpResponses)
        setLoading(false)
      }
    })()
  }, [props.id])

  const postResponse = async () => {
    if (textAreaRef.current?.value) {
      const res = await postRes(props.id, userdata.uid, UNIXTime, textAreaRef.current.value)
      setResponses([...responses as Res[], {
        sentAt: res.sentAt,
        text: res.text,
        userdata: res.userdata
      }])
      textAreaRef.current.value = ""
    }
  }

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" px={3} pb={3} shadow="lg" position="relative" zIndex={10}>
        <FontAwesomeIcon icon={faAngleLeft} onClick={props.backToList} style={{ height: "1.8rem", cursor: "pointer", color: "#4a4848" }} />
        <Tooltip label={props.title}>
          <Text className="kr tpl" ml={2}>{props.title}</Text>
        </Tooltip>
        <FontAwesomeIcon icon={faArrowRotateRight} style={{ height: "1.5rem", cursor: "pointer", color: "#4a4848" }} />
      </Flex>

      <VStack bg="#efefef" h={{ base: 350, md: 314, lg: 350 }} overflowY="auto" px={4} py={3} align="stretch" divider={<StackDivider borderColor="gray.200" />} position="relative">
        {isLoading ?
          <Box textAlign="center">
            <Spinner size="sm" />
            <Text className="kr" fontSize="0.8rem">レスを取得中…</Text>
          </Box>
          : responses?.length ? responses.map((v, k) => {
            return (
              <Box key={k}>
                <Flex>
                  <Avatar src={v.userdata.iconUrl} size="sm"></Avatar>
                  <Box ml={2}>
                    <Text fontSize="0.7rem" ml={0} color="gray.500">{`${k + 1}: ${v.userdata.name}・${moment(v.sentAt * 1000).format("YYYY/MM/DD HH:mm:ss")}`}</Text>
                    <Text className="kr" fontSize="0.85rem" mt={0} whiteSpace="pre-wrap">{v.text.replaceAll("\\n", "\n")}</Text>
                  </Box>
                </Flex>
              </Box>
            )
          })
            : <Text className="kr" fontSize="0.8rem" align="center">このスレッドには書き込みがありません</Text>}
      </VStack>
      <Box>
        <Textarea placeholder="テキストを入力…" size="xs" ref={textAreaRef} />
        <Button size="xs" w="100%" onClick={postResponse}>送信する</Button>
      </Box>
    </Box>
  )
}

export default Thread