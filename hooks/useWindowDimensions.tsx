import { useCallback, useState, useEffect } from "react"

export const useWindowDimensions = () => {
	const isClient = typeof window === "object"
	const getWindowDimensions = useCallback(() => {
		return {
			WDwidth: isClient ? window?.innerWidth : 0,
			WDheight: isClient ? window?.innerHeight : 0
		}
	}, [isClient])
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
	useEffect(() => {
		const onResize = () => {
			setWindowDimensions(getWindowDimensions())
		}
		window.addEventListener("resize", onResize)
		return () => window.removeEventListener("resize", onResize)
	}, [getWindowDimensions])
	return windowDimensions
}