//Chakra UI Components
import { Flex, Avatar, Center } from '@chakra-ui/react'

//Custom Hooks
import { useResponsive } from '../hooks/useResponsive'

interface Props {
	userName: string,
	userIconSrc: string
}

const UserInfo = (props: Props) => {
	const responsiveType = useResponsive()

	return(
		<>
			{responsiveType === "SmartPhone" &&
				<Flex justify="space-between">
					{/*名前が長すぎる場合はMarqueeで流す？*/}
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
		</>
	)
}

export default UserInfo