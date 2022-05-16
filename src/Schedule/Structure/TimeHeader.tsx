import React from 'react'
import styles from './css/TimeHeader.module.css'
import { Typography } from '@mui/material'
import { timeToString } from '../util/time'
import { useSchedule } from '../Contexts/ScheduleContext'

function TimeHeader() {
  const {minuteWidth,lineGap,startMinute,endMinute} = useSchedule();

  var times=[]  
  for (var i=startMinute; i<=endMinute; i+=lineGap){
    times.push(
      <Typography className={styles.timeLabels} variant="h6" key={i}
        style={{
            width:(minuteWidth*lineGap)+'px'}}
            >
            {timeToString(i)}
      </Typography>
    )
  }

  return (
    <div className={styles.timeWrapper}>
      {times}
    </div>
  )
}

export default TimeHeader