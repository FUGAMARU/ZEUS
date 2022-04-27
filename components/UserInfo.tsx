//React Hooks
import { useRef, useState } from "react"

//Chakra UI Components
import { Flex, Avatar, Center, Popover, PopoverTrigger, Box, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, Text } from "@chakra-ui/react"

//Custom Hooks
import { useResponsive } from "../hooks/useResponsive"

//Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPen, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { auth } from "../firebase"

interface Props {
	userName: string,
	userIconSrc: string
}

const UserInfo = (props: Props) => {
	const responsiveType = useResponsive()
	const popoverRef = useRef(null)
	const [editProfileTextColor, setEditProfileTextColor] = useState("#4a4848")
	const [signOutTextColor, setSignOutTextColor] = useState("#4a4848")

	const changeTextColor = (elm: string, sw: boolean) => {
		switch(elm){
			case "editProfile":
				sw ? setEditProfileTextColor("white") : setEditProfileTextColor("#4a4848")
				break
			
			case "signOut":
				sw ? setSignOutTextColor("white") : setSignOutTextColor("#4a4848")
				break
		}
	}

 	return(
		<Popover initialFocusRef={popoverRef}>
			{({ isOpen }) => (
			<>
				<PopoverTrigger>
					<Box px={{base: 3, md: 5, lg: 7}} py={2} borderRadius={25} cursor="pointer" transition="0.4s all ease-out" _hover={{bg: "#f5f5f5", boxShadow: "5px 5px 11px #dedede, -5px -5px 11px #ffffff"}} style={isOpen ? {backgroundColor: "#f5f5f5", boxShadow: "5px 5px 11px #dedede, -5px -5px 11px #ffffff"} : {}}>					
						{responsiveType === "SmartPhone" &&
							<Flex justify="space-between">
								<Center className="user-info-name"><p className="ksb tpl" style={{fontSize: "0.8rem", maxWidth: "4.5rem"}}>{props.userName}</p></Center>
								<Avatar className="user-info-icon" ml={2} size="sm" name={props.userName} src={props.userIconSrc} />
							</Flex>
						}
						{responsiveType === "Tablet" &&
							<Flex justify="space-between" className="user-info-wrapper">
								<Center className="user-info-name"><p className="ksb tpl" style={{maxWidth: "10.5rem"}}>{props.userName}</p></Center>
								<Avatar className="user-info-icon" ml={2} size="sm" name={props.userName} src={props.userIconSrc} />
							</Flex>
						}
						{responsiveType === "PC" &&
							<Flex justify="space-between" className="user-info-wrapper">
								<Center className="user-info-name"><p className="ksb tpl" style={{fontSize: "1.1rem", maxWidth: "22.5rem"}}>{props.userName}</p></Center>
								<Avatar className="user-info-icon" ml={2} size="sm" name={props.userName} src={props.userIconSrc} />
							</Flex>
						}
					</Box>
				</PopoverTrigger>
				<PopoverContent borderRadius={15}>
					<PopoverArrow />
					<PopoverHeader>
						<Flex justifyContent="space-between" px={4}>
							<Flex direction="column" alignItems="center" p={2} borderRadius={10} cursor="pointer" transition="0.3s all ease-out" _hover={{bg: "#10c9c3"}} onMouseEnter={() => changeTextColor("editProfile", true)} onMouseLeave={() => changeTextColor("editProfile", false)}>
								<Box color={editProfileTextColor} transition="0.3s all ease-out">
									<FontAwesomeIcon icon={faUserPen} />
								</Box>
								<Text className="kr" fontSize="0.8rem" color={editProfileTextColor} transition="0.3s all ease-out">プロフィール編集</Text>
							</Flex>
							<Flex direction="column" alignItems="center" p={2} borderRadius={10} onClick={() => auth.signOut()} cursor="pointer" transition="0.3s all ease-out" _hover={{bg: "#10c9c3"}} onMouseEnter={() => changeTextColor("signOut", true)} onMouseLeave={() => changeTextColor("signOut", false)}>
								<Box color={signOutTextColor} transition="0.3s all ease-out">
									<FontAwesomeIcon icon={faRightFromBracket} />
								</Box>
								<Text className="kr" fontSize="0.8rem" color={signOutTextColor} transition="0.3s all ease-out">サインアウト</Text>
							</Flex>
						</Flex>
					</PopoverHeader>
				</PopoverContent>
			</>
			)}
		</Popover>
	)
}

export default UserInfo