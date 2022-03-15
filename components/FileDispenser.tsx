//Next.js Components
import Image from 'next/image'

//Chakra UI Components
import { Box, Text, Flex, Button, VStack, StackDivider } from '@chakra-ui/react'

const FileDispenser = () => {
	return(
		<Box>
			<VStack px={5} py={2} align="stretch" divider={<StackDivider borderColor="gray.200"/>} overflowY="auto" h={{base: 180, md: 400, lg: 180}}>
				{/*将来的にはコンポーネント化する*/}
				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/pdf.svg" height={18} width={18}/><Text className="kr" fontSize={15} ml={1}>15回目課題.pdf</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/docx.svg" height={18} width={18}/><Text className="kr" fontSize={15} ml={1}>課題.docx</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/pptx.svg" height={18} width={18}/><Text className="kr" fontSize={15} ml={1}>実践演習2.pptx</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/xlsx.svg" height={18} width={18}/><Text className="kr" fontSize={15} ml={1}>受注台帳.xlsx</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/pdf.svg" height={16} width={16}/><Text className="kr" fontSize={15} ml={1}>15回目課題.pdf</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/docx.svg" height={18} width={18}/><Text className="kr" fontSize={15} ml={1}>課題.docx</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/pptx.svg" height={18} width={18}/><Text className="kr" fontSize={15} ml={1}>実践演習2.pptx</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/xlsx.svg" height={18} width={18}/><Text className="kr" fontSize={15} ml={1}>受注台帳.xlsx</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/pdf.svg" height={16} width={16}/><Text className="kr" fontSize={15} ml={1}>15回目課題.pdf</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/docx.svg" height={18} width={18}/><Text className="kr" fontSize={15} ml={1}>課題.docx</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/pptx.svg" height={18} width={18}/><Text className="kr" fontSize={15} ml={1}>実践演習2.pptx</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

				<Flex justifyContent="space-between" alignItems="center" minH={8}>
					<Flex>
						<Image src="/ext-icons/xlsx.svg" height={18} width={18}/><Text className="kr" fontSize={15} ml={1}>受注台帳.xlsx</Text>
					</Flex>
					<Button size="xs" variant="outline" colorScheme="orange">ダウンロード</Button>
				</Flex>

			</VStack>
		</Box>
	)
}

export default FileDispenser