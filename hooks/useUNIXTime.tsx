//React Hooks
import { useState, useEffect } from "react"

//Libraries
import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then((res) => res.json())
import { useSetRecoilState } from "recoil"
import { RecoilUNIXTime } from "../atoms/UNXITimeAtom"

const useUNIXTime = () => {
  const [localUNIXTime, setLocalUNIXTime] = useState(0)
  const RecoilUNIXTimeSetter = useSetRecoilState(RecoilUNIXTime)
  const [updateFlag, setUpdateFlag] = useState(true) //SWRが時刻取得完了したことをトリガーとして授業情報表示コンポーネントを再レンダリングするためのstate
  const [isClockStarted, setClockStarted] = useState(false) //UNIXタイムスタンプのカウントアップがスタートしているかどうか
  interface WorldTimeApi {
    abbreviation: string,
    client_ip: string,
    datetime: string,
    day_of_week: number,
    day_of_year: number,
    dst: boolean,
    dst_from: any,
    dst_offset: number,
    dst_until: any,
    raw_offset: number,
    timezone: string,
    unixtime: number,
    utc_datetime: string,
    utc_offset: string,
    week_number: number
  }
  const { data: apiData, error: apiErr } = useSWR<WorldTimeApi>("https://worldtimeapi.org/api/timezone/Asia/Tokyo", fetcher)

  useEffect(() => {
    if (apiData) {
      if (!!!isClockStarted) {
        setLocalUNIXTime(apiData.unixtime - Number(process.env.NEXT_PUBLIC_TIME_ADJUSTMENT_MINUS))
        RecoilUNIXTimeSetter(apiData.unixtime - Number(process.env.NEXT_PUBLIC_TIME_ADJUSTMENT_MINUS))
        setInterval(() => {
          setLocalUNIXTime((prev) => prev + 1)
          RecoilUNIXTimeSetter((prev) => prev + 1)
        }, 1000)
        setClockStarted(true)
      } else {
        console.log(`UNIXタイムスタンプ新規受信 => ${apiData.unixtime}`)
        setLocalUNIXTime(apiData.unixtime - Number(process.env.NEXT_PUBLIC_TIME_ADJUSTMENT_MINUS))
        RecoilUNIXTimeSetter(apiData.unixtime - Number(process.env.NEXT_PUBLIC_TIME_ADJUSTMENT_MINUS))
        console.log(`時刻合わせ完了 - ${new Date(apiData.unixtime * 1000).toString()}`)
        setUpdateFlag(prev => !prev)
      }
    }
  }, [apiData])

  useEffect(() => {
    if (apiErr) {
      setLocalUNIXTime(-1)
      RecoilUNIXTimeSetter(-1)
    }
  }, [apiErr])

  return { localUNIXTime, updateFlag }
}

export default useUNIXTime