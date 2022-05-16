import { Box, Typography } from '@mui/material'
import React from 'react'

import calStyles from './Calender.module.css'
import CSS from 'csstype';
import CalenderItem from './CalenderItem';
import TimeHeader from './SubComponents/TimeHeader';
import HelperLines from './SubComponents/HelperLines';
import { daysOfTheWeek, groupByRoom } from './Helpers/sorters';
import { StartEndTime } from './Helpers/time';
import Row from './SubComponents/Row'
import { intervalPartitioning } from './Helpers/scheduling';

const rowHeight=100;
const minwidth=2;



interface dayProps{
    name:string;
    startOffset:number;
    data?:ActivityClass[]
    style?: CSS.Properties;
    children?: React.ReactNode | React.ReactNode[];
    editData:any;
}

export interface ActivityClass{
    id:number;
    start:Date;
    duration:number;
    title:string;
    room:string;
}

interface CalenderProps{
    data:ActivityClass[];
    children?:React.ReactNode | React.ReactNode[];
    startTime?:number;
    endTime?:number;
    editData:any;
}



function Day(props:dayProps){
    if (props.data===undefined){return (<></>);}
    var roomSorted=groupByRoom(props.data);

    const prev=(start:Date ,room:string):{room:string, day:Date}=>{
        var i =roomSorted.findIndex((item)=>item.room===room);        
        if (i===0){
            return {
                room:room,
                day:start
            }
        }
        return{
                room:roomSorted[i-1].room,
                day:start
            };
    }
    const next=(start:Date ,room:string)=>{
        var i =roomSorted.findIndex((item)=>item.room===room);
        if (i===-1 || i+1 === roomSorted.length){
            return {
                room:room,
                day:start
            }
        }
        return{
                room:roomSorted[i+1].room,
                day:start
            };
    }

    var rooms=roomSorted.map(
        x=>
            <Row 
                name={x.room} 
                key={x.room}
                data={x.classes}
                startOffset={props.startOffset}
                rowHeight={rowHeight}
                minwidth={minwidth}
                searchFunctions={{
                    roomPrev:prev,
                    roomNext:next
                }}
                editData={props.editData}
                >
            </Row>
    )
    return(
        <Box 
            style={{height:`max(${rowHeight*roomSorted.length}px , 200px`}} 
            className={calStyles.Day}
            >
            <Box className={calStyles.DayTitle}>
                <Typography 
                    variant="h5" 
                    color="initial"
                    >{props.name}
                </Typography>
            </Box>
            <Box className={calStyles.RoomWrapper}>
                {rooms}
            </Box>
        </Box>
    );
}



function Calender(props:CalenderProps) {
    var days = daysOfTheWeek(props.data);
    
    var {early,late} = StartEndTime(props.data);
    var startTime= props.startTime ? props.startTime : early
    var endTime= props.endTime ? props.endTime : late
    
    //TODO add sorting by exact date and prop to show for it

  return (
    <Box className={calStyles.Calender}>
        <Box className={calStyles.CalenderInner}>
            <Box className={calStyles.Right}>
                <TimeHeader
                    start={startTime}
                    end={endTime}
                    increment={30}
                    pixelsPerMinute={minwidth}
                    />
                <HelperLines
                    start={startTime}
                    end={endTime}
                    increment={30}
                    pixelsPerMinute={minwidth}
                    />
            </Box>
            <Box className={calStyles.DayWrapper}>
                {days.map(x=>
                    <Day 
                        key={x.day} 
                        name={x.day} 
                        data={x.classes}
                        startOffset={startTime}
                        editData={props.editData}
                        />)}
            </Box>
        </Box>
    </Box>
  )
}

export default Calender