import { Typography } from '@mui/material'
import React from 'react'
import { ScheduleItem } from './Schedule'
import styles from './Day.module.css'
import { useSchedule } from '../Contexts/ScheduleContext'
import Room from './Room'

interface DayProps{
    structure:{
        day:Date,
        rooms:string[]
    }
    events:ScheduleItem[]
}

function Day(props:DayProps) {
    const {dayType,rowHeight,minuteWidth,startMinute,endMinute,DragScene} = useSchedule();
    var name=""

    //Format the date
    if (dayType==='weekday'){
        name=props.structure.day.toLocaleDateString([], {weekday: 'long'})
    }
    else if (dayType==='date'){
        name=props.structure.day.toLocaleDateString([], {weekday: 'long',month:'short',day:'numeric',})
    }

    const handleDrag=(e:any)=>{
        e.stopPropagation();
        if (e.buttons==1){
            DragScene(-e.movementX,-e.movementY);
        }
    }

    return(
        <div 
            style={{
                height:`${rowHeight*props.structure.rooms.length}px`,
                width:`calc(${(endMinute-startMinute)*minuteWidth}px + 4em)`
            }} 
            className={styles.Day}
            data-day={props.structure.day.toISOString()}
            onMouseMove={handleDrag}
            >
            <div className={styles.DayTitle}>
                <Typography 
                    variant="h5" 
                    color="initial"
                    >{name}
                </Typography>
            </div>
            <div className={styles.RoomWrapper}>
                {props.structure.rooms.map(e=> 
                    <Room name={e} 
                          events={ props.events.filter(x=>x.room===e) }
                    />  )} 
            </div>
        </div>
    );
}

export default Day