import React from 'react'
import { Box } from '@mui/system'
import styles from './styles.module.css'


interface LineProps{
    start:number
    end:number
    increment:number
    pixelsPerMinute:number
}


function HelperLines(props:LineProps) {
    var lines=[]
    for (var i=props.start; i<=props.end; i+=props.increment){
        lines.push(
            <div key={i} 
            className={styles.vertLine}
            style={{
                width:((props.pixelsPerMinute*props.increment)-1)+'px'
            }}/>
        )
      }
  return (
    <Box className={styles.vertLineWrapper}>
        {lines}
    </Box>
  )
}

export default HelperLines