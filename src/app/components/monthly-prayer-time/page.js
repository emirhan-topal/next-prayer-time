"use client";

import styles from './page.css'
import React,{ useState, useEffect } from 'react'

export default function page() {

  const [prayerTimes,setPrayerTimes] = useState([])

    async function get(){
        try{
            const fetchData = await fetch('https://ipwho.is/')
            const responseData = await fetchData.json()

            const prayerFetchData = await fetch(`https://admin.awqatsalah.com/api/PlaceAPI/GetByMonthlyCityId?longitude=${responseData.longitude}&latitude=${responseData.latitude}`)
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
    <div id='monthlyDiv'>
        <table id='monthlyTable' border="1">
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Sabah</th>
                <th>Güneş</th>
                <th>Öğle</th>
                <th>İkindi</th>
                <th>Akşam</th>
                <th>Yatsı</th>
              </tr>
            </thead>
            <tbody>
              {prayerTimes}
            </tbody>
        </table>
    </div>
  )
}