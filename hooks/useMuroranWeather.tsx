//Libraries
import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useMuroranWeather = () => {
	const { data, error } = useSWR("https://weather.tsukumijima.net/api/forecast/city/015010", fetcher)

	return {
		muroranWeather: data ? data: undefined,
		isMuroranWeatherLoading: !data && !error,
		isMuroranWeatherError: error
	}
}

export default useMuroranWeather