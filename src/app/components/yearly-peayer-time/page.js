"use client";

import React,{ useState, useEffect } from 'react'
import styles from './page.css'

export default function YearlyPrayerTime() {
    const [prayerTimes,setPrayerTimes] = useState([])

    async function get(){
        try{
            const fetchData = await fetch('https://ipwho.is/')
            const responseData = await fetchData.json()

            const prayerFetchData = await fetch(`https://admin.awqatsalah.com/api/PlaceAPI/GetByYearCityId?longitude=${responseData.longitude}&latitude=${responseData.latitude}`)
            const prayerTimeData = (await prayerFetchData.json()).daily.data

            const updatedTimes = []

            prayerTimeData.forEach((prayerTime,index) => {
                updatedTimes.push(
                    <tr key={index}>
                        <td>{prayerTime.gregorianDateShort}</td>
                        <td>{prayerTime.fajr}</td>
                        <td>{prayerTime.sunrise}</td>
                        <td>{prayerTime.dhuhr}</td>
                        <td>{prayerTime.asr}</td>
                        <td>{prayerTime.maghrib}</td>
                        <td>{prayerTime.isha}</td>
                    </tr>
                )
            })

            setPrayerTimes(updatedTimes)
        }
        catch(err){

        }
    }

    useEffect(() => {
        get()
    },[])

  return (
    <div id='yearlyDiv'>
        <table border="1" id='yearlyTable'>
                <thead>
                    <tr>
                        <th><span>Tarih</span></th>
                        <th><span>Sabah</span></th>
                        <th><span>Güneş</span></th>
                        <th><span>Öğle</span></th>
                        <th><span>İkindi</span></th>
                        <th><span>Akşam</span></th>
                        <th><span>Yatsı</span></th>
                    </tr>
                </thead>
                <tbody>
                    {prayerTimes}
                </tbody>
        </table>
    </div>
  )
}
