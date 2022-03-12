import { useEffect, useState } from "react"

export const useTouchDevice = () => {
	const [isTouchDevice, setIsTouchDevice] = useState(false)

	useEffect(() => {
		const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)")

		setIsTouchDevice(mediaQuery.matches)

		const handleMediaQueryChanged = (event: MediaQueryListEvent) => {
			setIsTouchDevice(event.matches)
		}

		mediaQuery.addEventListener("change", handleMediaQueryChanged)

		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChanged)
		}
	})

	return isTouchDevice
}