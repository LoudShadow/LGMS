import React from 'react'
import styles from './styles.module.css'
import { Typography,Box } from '@mui/material'
import { timeToString } from '../Helpers/time'

interface TimeProps{
    start:number
    end:number
    increment:number
    pixelsPerMinute:number
}

function TimeHeader(props:TimeProps) {
  var times=[]
  
  for (var i=props.start; i<=props.end; i+=props.increment){
    times.push(
      <Typography 
        className={styles.timeLabels} 
        variant="h6" 
        key={i}
        style={{
            width:(props.pixelsPerMinute*props.increment)+'px'}}
            >
            {timeToString(i)}
      </Typography>
    )
  }

  return (
    <Box className={styles.timeWrapper}>
      {times}
    </Box>
  )
}

export default TimeHeader