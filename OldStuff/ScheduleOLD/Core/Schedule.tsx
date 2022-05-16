import React, { useContext, useRef } from "react";
import ScheduleProvider, { defaultSettings, providerValue } from '../Contexts/ScheduleContext'
import TimeHeader from "../Structure/TimeHeader";
import { daysOfTheWeek } from "../util/sorters";
import  HelperLines from '../Structure/HelperLines'
import { SameDay } from "../util/time";
import Day from "./Day";
import style from './Schedule.module.css'
import { StructureFromDaysRooms,StructureFromEvents } from "./util/CreateStructure";
import { useScheduleEdit } from "../Contexts/ScheduleEditContext";

interface ScheduleItem{
    id:number;
    start:Date;
    duration:number;
    title:string,
    room:string,
    subtext?:string,
}

interface ScheduleProps extends providerValue{
    events:ScheduleItem[];
    days?:Date[];           //Either days and rooms should be provided
    rooms?:string[];        //or structure should if neither are provided
    structure?:{            //the structure is pulled from the events            
        day:Date;
        rooms:string[];     //represents the days and rooms as nested
    }[];
}

function Schedule(props:ScheduleProps) { 
    if (!props.structure && props.days && props.rooms){
        var structure = StructureFromDaysRooms(props.days,props.rooms);
    }else{
        structure=StructureFromEvents(props.events);
    }


    const editable=useScheduleEdit()
    var calender=useRef(null);
    if (!!editable){
        const {calenderRef}=editable;
        calender=calenderRef;
    }
    //TODO add sorting by exact date and prop to show for it

  return (
      
        <ScheduleProvider {...props}>
            <div className={style.Schedule} ref={calender}>
                    <TimeHeader/>
                <div className={style.Background}>
                    <HelperLines/>
                </div>
                <div className={style.DayWrapper}>
                    {
                        structure.map(day=>
                            <Day structure={day} 
                                 events={props.events.filter(e=>SameDay(e.start,day.day))}/>
                            )
                    }
                </div>
            </div>
        </ScheduleProvider>
  )
}
Schedule.defaultProps={
    ...defaultSettings
}

export type {ScheduleItem,ScheduleProps}
export default Schedule