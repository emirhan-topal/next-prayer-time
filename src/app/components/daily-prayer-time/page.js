"use client";

import React,{useState,useEffect} from 'react'
import style from './page.css'

export default function page() {
    const [sabahTime,setSabahTime] = useState("Getiriliyor...")
    const [gunesTime,setGunesTime] = useState("Getiriliyor...")
    const [ogleTime,setOgleTime] = useState("Getiriliyor...")
    const [ikindiTime,setIkindiTime] = useState("Getiriliyor...")
    const [aksamTime,setAksamTime] = useState("Getiriliyor...")
    const [yatsiTime,setYatsiTime] = useState("Getiriliyor...")
    const [tarihTime,setTarihTime] = useState("Getiriliyor...")

    async function get() {
        try{
            const fetchData = await fetch('https://ipwho.is/')
            const responseData = await fetchData.json()

            const prayerFetchData = await fetch(`https://admin.awqatsalah.com/api/PlaceAPI/GetByDailyCityId?longitude=${responseData.longitude}&latitude=${responseData.latitude}`)
            const prayerTimeResponseData = (await prayerFetchData.json()).daily.data[0]

            setSabahTime(prayerTimeResponseData.fajr)
            setGunesTime(prayerTimeResponseData.sunrise)
            setOgleTime(prayerTimeResponseData.dhuhr)
            setIkindiTime(prayerTimeResponseData.asr)
            setAksamTime(prayerTimeResponseData.maghrib)
            setYatsiTime(prayerTimeResponseData.isha)
            setTarihTime(prayerTimeResponseData.gregorianDateShort)
        }

        catch(err){
            setSabahTime('Başarısız.')
            setGunesTime('Başarısız.')
            setOgleTime('Başarısız.')
            setIkindiTime('Başarısız.')
            setAksamTime('Başarısız.')
            setYatsiTime('Başarısız.')
            setTarihTime('Başarısız.')
        }
    }

    useEffect(() => {
        get()
    })

    return (
        <div>
            <table id='dailyTable' border="1">
                <thead>
                    <tr><td align='center' colSpan="7"><h1 style={{margin: '5px'}}>Bugün</h1></td></tr>
                    <tr id='descreptions' height="40">
                        <td><span>Tarih</span></td>
                        <td><span>Sabah</span></td>
                        <td><span>Güneş</span></td>
                        <td><span>Öğle</span></td>
                        <td><span>İkindi</span></td>
                        <td><span>Akşam</span></td>
                        <td><span>Yatsı</span></td>
                    </tr>
                </thead>
                <tbody>
                    <tr id='daily-prayer-times' height="50">
                        <td><span>{tarihTime}</span></td>
                        <td><span>{sabahTime}</span></td>
                        <td><span>{gunesTime}</span></td>
                        <td><span>{ogleTime} </span></td>
                        <td><span>{ikindiTime}</span></td>
                        <td><span>{aksamTime}</span></td>
                        <td><span>{yatsiTime}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}