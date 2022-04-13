//Libraries
import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useUNIXTime = () => {
	const { data, error } = useSWR("https://worldtimeapi.org/api/timezone/Asia/Tokyo", fetcher);

	return {
		UNIXTime: data ? data.unixtime : undefined,
		isUNIXTimeLoading: !data && !error,
		isUNXITimeError: error
	}
}

export default useUNIXTime