import React from 'react'
import Typography from '@mui/material/Typography'
import { ScheduleItem } from "../Core/Schedule";
import style from './css/FreeScheduleEvent.module.css';
import { useSchedule } from "../Contexts/ScheduleContext";
import {floorTime} from '../util/time'


interface ScheduleItemProps {
    data: ScheduleItem;
    functions:any;
    top:number;
    left:number;
  }

  const ClassColors = [
    ["rgb(179,210,54)", "rgba(179,210,54,0.25)"],
    ["rgb(1,172,163)", "rgba(1,172,163,0.25)"],
    ["rgb(1,172,163)", "rgba(1,172,163,0.25)"],
    ["rgb(121,41,140)", "rgba(121,41,140,0.25)"],
    ["rgb(121,41,140)", "rgba(121,41,140,0.25)"],
    ["rgb(245,145,31)", "rgba(245,145,31,0.25)"],
  ];

function FreeScheduleEvent(props: ScheduleItemProps) {

    const {
        startMinute,
        minuteWidth,
        titleSize,
        timeSize,
        rowHeight,
        } = useSchedule();
    
    const localStartMinute =
        Math.floor(
          ( props.data.start.getHours() * 60 
          + props.data.start.getMinutes() - startMinute
          ) / 5
        ) * 5;
    const localEndMinute = Math.floor(
        ( props.data.end.getHours() * 60 
        + props.data.end.getMinutes() - startMinute
        ) / 5
        ) * 5;
    const width = (localEndMinute - localStartMinute) * minuteWidth; 



    return (
        <div
            className={style.Freeitem}
            style={{
            left: `${props.left}px`,
            top: `${props.top}px`,
            width: `calc(${width}px - 4px)`,
            height: `${rowHeight}px`,
            backgroundColor: ClassColors[0][0],
            }}
        >
            <Typography
            style={{
                lineHeight: 1.1,
                fontSize: rowHeight * titleSize / 25 + "px",
            }}
            >
            {props.data.title}
            </Typography>
            <Typography
            style={{
                lineHeight: 1.1,
                fontSize: rowHeight * timeSize / 25 + "px",
            }}
            >
            {props.data.start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}
            -
            {props.data.end.toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}
            </Typography>
            { !!props.data.subtext?
                <Typography
                style={{
                    lineHeight: 1.1,
                    fontSize: rowHeight * timeSize / 25 + "px",
                }}
                >
                {props.data.subtext}
            </Typography>
            :
            ""

            }
      </div>
    )
}

export default FreeScheduleEvent