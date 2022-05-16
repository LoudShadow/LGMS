import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import styles from './Room.module.css';
import { intervalPartitioning } from '../util/scheduling';
import { useEffect, useRef, useState } from 'react';


import { ScheduleItem } from './Schedule'
import { useSchedule } from '../Contexts/ScheduleContext';
import ScheduleEvent from './ScheduleItem';
import { useScheduleEdit } from '../Contexts/ScheduleEditContext';

interface roomProps{
    name:string;
    events:ScheduleItem[]
}

function Room(props:roomProps){
    const {roomDirection} =useSchedule()
    var partitioned=intervalPartitioning(props.events);
    var content:React.ReactElement[]=[] 

    const editable =useScheduleEdit();
    var myRef=useRef();
    useEffect(()=>{
        if (!!editable){
            const {storeDayReference} = editable;
            const temp:any=myRef;
            const day=new Date(temp.current.parentElement.parentElement.dataset.day);
            storeDayReference(day,props.name,myRef);
        }
    },[myRef]);

    partitioned.forEach((row,index)=>{        
        row.forEach(x=>{
            content.push(
                <ScheduleEvent 
                    data={x} 
                    key={x.id} 
                    totalRows={partitioned.length}
                    rowNumber={index}
                    />
            )

    })})
    return(
        <Box 
            className={styles.Room} 
            data-room={props.name}
            ref={myRef}>
            <Box className={styles.RoomTitle+" "+(roomDirection=='vertical'?styles.Vertical:"")}>
                <Typography 
                    variant="h6" 
                    color="initial"
                    >{props.name}
                </Typography>
            </Box>
            {content}
        </Box>
    )
}

export default Room;