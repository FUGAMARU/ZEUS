//Libraries
import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useTokyoWeather = () => {
	const { data, error } = useSWR("https://weather.tsukumijima.net/api/forecast/city/130010", fetcher)

	return {
		tokyoWeather: data ? data: undefined,
		isTokyoWeatherLoading: !data && !error,
		isTokyoWeatherError: error
	}
}

export default useTokyoWeather