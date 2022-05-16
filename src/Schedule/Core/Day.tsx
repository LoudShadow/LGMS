import React from 'react'
import { useSchedule } from '../Contexts/ScheduleContext'
import style from './css/Day.module.css'
import { ScheduleItem,Timetable as Timetable_t } from './Schedule'
import Typography from '@mui/material/Typography'
import Timetable from './Timetable'

interface DayProps{
    day:Date;
    timetable:Timetable_t[];
    events:ScheduleItem[];
}


function Day(props:DayProps) {

  const {dayType,dayTitleWidth,rowTitleWidth,dayDirection,minuteWidth,startMinute,endMinute} = useSchedule();
    var name="";
    if (dayType==='weekday'){
        name=props.day.toLocaleDateString([], {weekday: 'long'})
    }
    else if (dayType==='date'){
        name=props.day.toLocaleDateString([], {weekday: 'long',month:'short',day:'numeric',})
    }

  return (
    <div 
        style={{
            width:`calc(${(endMinute-startMinute)*minuteWidth}px + ${dayTitleWidth} + ${rowTitleWidth})`
        }} 
        className={style.Day}
        >

        <div 
            className={style.DayTitle+" "+(dayDirection==='vertical'?style.Vertical:"")}
            >
            <Typography 
                variant="h5" 
                color="initial"
                >{name}
            </Typography>
        </div>

        <div 
            className={style.RoomWrapper}
            style={{width:`calc(100% - ${dayTitleWidth})`}}
            >
            {props.timetable.map(t=> 
                <Timetable 
                    key={t.name}
                    name={t.name} 
                    day={props.day}
                    rows={t.rows}
                    events={ props.events.filter(x=>x.type===t.name) }
                />  
                )} 
            <div className={style.Filler}></div>
        </div>

    </div>
  )
}

export default Day