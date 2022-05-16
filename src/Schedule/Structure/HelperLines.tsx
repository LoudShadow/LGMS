import React from 'react'
import styles from './css/HelperLines.module.css'
import { Typography } from '@mui/material'
import { useSchedule } from '../Contexts/ScheduleContext'

function HelperLines() {
  const {minuteWidth,lineGap,startMinute,endMinute} = useSchedule();

  var times=[]  
  for (var i=startMinute; i<=endMinute; i+=lineGap){
    times.push(
      <div className={styles.LineLabels} key={i}
        style={{width:(minuteWidth*lineGap)+'px'}}>
      </div>
    )
  }

  return (
    <div className={styles.vertLineWrapper}>
      {times}
    </div>
  )
}
export default HelperLines;