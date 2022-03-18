//Chakra UI Components
import { Box, Text, Flex, Button, VStack, StackDivider, Tooltip } from '@chakra-ui/react'

const FileDispenser = () => {
	return(
		<Box>
			<VStack px={5} py={2} align="stretch" divider={<StackDivider borderColor="gray.200"/>} overflowY="auto" h={{base: 180, md: 400, lg: 180}}>
				{/*将来的にはコンポーネント化する*/}

				<Box>
					<Flex justifyContent="space-between" alignItems="center">
						<Flex alignItems="center" w="70%">
							<img src="/ext-icons/docx.svg" style={{height: "1.2rem"}} />
							<Tooltip label="長ーーーーい名前の課題ファイルだよーーーー.docx">
								<Text className="kr tpl" fontSize={14} ml={1}>長ーーーーい名前の課題ファイルだよーーーー.docx</Text>
							</Tooltip>
						</Flex>
						<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
					</Flex>
				</Box>

				<Box>
					<Flex justifyContent="space-between" alignItems="center">
						<Flex alignItems="center" w="70%">
							<img src="/ext-icons/pptx.svg" style={{height: "1.2rem"}} />
							<Tooltip label="実践演習2.pptx">
								<Text className="kr tpl" fontSize={14} ml={1}>実践演習2.pptx</Text>
							</Tooltip>
						</Flex>
						<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
					</Flex>
				</Box>

				<Box>
					<Flex justifyContent="space-between" alignItems="center">
						<Flex alignItems="center" w="70%">
							<img src="/ext-icons/xlsx.svg" style={{height: "1.2rem"}} />
							<Tooltip label="受注台帳.xlsx">
								<Text className="kr tpl" fontSize={14} ml={1}>受注台帳.xlsx</Text>
							</Tooltip>
						</Flex>
						<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
					</Flex>
				</Box>

				<Box>
					<Flex justifyContent="space-between" alignItems="center">
						<Flex alignItems="center" w="70%">
							<img src="/ext-icons/pdf.svg" style={{height: "1.2rem"}} />
							<Tooltip label="15回目課題.pdf">
								<Text className="kr tpl" fontSize={14} ml={1}>15回目課題.pdf</Text>
							</Tooltip>
						</Flex>
						<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
					</Flex>
				</Box>

				<Box>
					<Flex justifyContent="space-between" alignItems="center">
						<Flex alignItems="center" w="70%">
							<img src="/ext-icons/docx.svg" style={{height: "1.2rem"}} />
							<Tooltip label="長ーーーーい名前の課題ファイルだよーーーー.docx">
								<Text className="kr tpl" fontSize={14} ml={1}>長ーーーーい名前の課題ファイルだよーーーー.docx</Text>
							</Tooltip>
						</Flex>
						<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
					</Flex>
				</Box>

				<Box>
					<Flex justifyContent="space-between" alignItems="center">
						<Flex alignItems="center" w="70%">
							<img src="/ext-icons/pptx.svg" style={{height: "1.2rem"}} />
							<Tooltip label="実践演習2.pptx">
								<Text className="kr tpl" fontSize={14} ml={1}>実践演習2.pptx</Text>
							</Tooltip>
						</Flex>
						<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
					</Flex>
				</Box>

				<Box>
					<Flex justifyContent="space-between" alignItems="center">
						<Flex alignItems="center" w="70%">
							<img src="/ext-icons/xlsx.svg" style={{height: "1.2rem"}} />
							<Tooltip label="受注台帳.xlsx">
								<Text className="kr tpl" fontSize={14} ml={1}>受注台帳.xlsx</Text>
							</Tooltip>
						</Flex>
						<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
					</Flex>
				</Box>

				<Box>
					<Flex justifyContent="space-between" alignItems="center">
						<Flex alignItems="center" w="70%">
							<img src="/ext-icons/pdf.svg" style={{height: "1.2rem"}} />
							<Tooltip label="15回目課題.pdf">
								<Text className="kr tpl" fontSize={14} ml={1}>15回目課題.pdf</Text>
							</Tooltip>
						</Flex>
						<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
					</Flex>
				</Box>

			</VStack>
		</Box>
	)
}

export default FileDispenser