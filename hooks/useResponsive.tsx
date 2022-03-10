import { useState, useEffect } from "react"
import { useWindowDimensions } from "./useWindowDimensions";

export const useResponsive = () => {
	const { WDwidth } = useWindowDimensions()
	const [responsiveType, setResponsiveType] = useState("")

	useEffect(() => {
		const w = window.innerWidth
		if(w <= 599){
			//スマホ
			setResponsiveType("SmartPhone")
		}else if(w <= 1024){
			//タブレット
			setResponsiveType("Tablet")
		}else{
			//PC
			setResponsiveType("PC")
		}
	}, [WDwidth])

	return responsiveType
}