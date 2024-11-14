"use client";

import styles from './page.css'
import React,{useState,useEffect} from 'react';
import DailyPrayerTime from './components/daily-prayer-time/page'
import WeeklyPrayerTime from './components/weekly-prayer-time/page';
import MonthlyPrayerTime from './components/monthly-prayer-time/page'
import YearlyPrayerTime from './components/yearly-peayer-time/page'

export default function Home(){
  const [nowHours,setNowHours] = useState(String((new Date()).getHours()).padStart(2, '0') + '.' + String((new Date()).getMinutes()).padStart(2, '0'))
  const [prayerTime,setPrayerTime] = useState(<WeeklyPrayerTime/>)

  useEffect(() => {
    setInterval(() => {
      setNowHours(String((new Date()).getHours()).padStart(2, '0') + '.' + String((new Date()).getMinutes()).padStart(2, '0'))
    }, 10000);
  },[])

  return (
    <main id='mainElement'>
      <span style={{color: 'white',fontSize:'50px'}}>{nowHours}</span>

      <br></br>
      
      <DailyPrayerTime/>

      <br></br>
      <br></br>

      <button className='prayerTimeButton' onClick={() => {
        setPrayerTime(<WeeklyPrayerTime/>)
      }}>Haftalık vakit</button>

      <button className='prayerTimeButton' onClick={() => {
        setPrayerTime(<MonthlyPrayerTime/>)
      }}>Aylık vakit</button>

      <button className='prayerTimeButton' onClick={() => {
        setPrayerTime(<YearlyPrayerTime/>)
      }}>Yıllık vakit</button>

      <br></br>
      <br></br>

      <div>{prayerTime}</div>
    </main>
  );
}