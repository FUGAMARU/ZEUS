//Custom Hooks
import { useTouchDevice } from '../hooks/useTouchDevice'

//Next.js Components
import Image from 'next/image'

//Chakra UI Components
import { Box, Text, Flex, Button, VStack, StackDivider } from '@chakra-ui/react'

const FileDispenser = () => {
	const isTouchDevice = useTouchDevice()

	return(
		<Box bg="white" shadow="xl" borderRadius={15} py={4} transition="0.4s all ease-out" _hover={!isTouchDevice ? {transform: "scale(1.05, 1.05)"} : {}}>
			<Text className="rmb" color="#2b2b2b" fontSize={23} ml={5}>FileDispenser</Text>
			<Box h={1} w="80%" mb={3} bgGradient="linear(to-r, #fad961, #f76b1b)" borderRightRadius={10}></Box>
			<VStack px={5} py={2} align="stretch" divider={<StackDivider borderColor="gray.200"/>} overflowY="auto" maxH={180}>
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