//Chakra UI Components
import { Flex, Avatar, Center } from '@chakra-ui/react'

//Custom Hooks
import { useResponsive } from '../hooks/useResponsive'

const UserInfo = () => {
	const responsiveType = useResponsive()

	return(
		<>
			{responsiveType === "SmartPhone" &&
				<Flex justify="space-between">
					{/*名前が長すぎる場合はMarqueeで流す？*/}
					<Center className="user-info-name"><p className="ksb" style={{fontSize: "0.8rem", maxWidth: "4.5rem"}}>梓川 咲太</p></Center>
					<Avatar className="user-info-icon" ml={2} size="sm" name="FUGAMARU" src="/profile-icon.jpg" />
				</Flex>
			}
			{responsiveType === "Tablet" &&
				<Flex justify="space-between" className="user-info-wrapper">
					<Center className="user-info-name"><p className="ksb" style={{maxWidth: "10.5rem"}}>牧之原 翔子</p></Center>
					<Avatar className="user-info-icon" ml={2} size="sm" name="FUGAMARU" src="/profile-icon.jpg" />
				</Flex>
			}
			{responsiveType === "PC" &&
				<Flex justify="space-between" className="user-info-wrapper">
					<Center className="user-info-name"><p className="ksb" style={{fontSize: "1.1rem", maxWidth: "22.5rem"}}>桜島 麻衣</p></Center>
					<Avatar className="user-info-icon" ml={2} size="sm" name="FUGAMARU" src="/profile-icon.jpg" />
				</Flex>
			}
		</>
	)
}

export default UserInfo