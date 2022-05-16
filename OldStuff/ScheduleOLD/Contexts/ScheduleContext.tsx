import React, {useContext, useRef } from "react";

//Handles the calender layout settings

interface providerValue {
    rowHeight:number;
    minuteWidth:number;
    lineGap:number;

    titleSize:number;
    timeSize:number;

    startMinute:number;
    endMinute:number;

    dayType:"weekday"|"date";   
    roomDirection:"horizontal"|"vertical"; 

    DragScene:(dy:number,dx:number)=>void
}

interface ScheduleproviderProps extends providerValue{

    children?: React.ReactNode | React.ReactNode[];
}


const defaultSettings:providerValue={
    rowHeight:80,
    minuteWidth:5,
    lineGap:15,

    titleSize:5,
    timeSize:4,

    startMinute:9*60,
    endMinute:21*60,
    dayType:"weekday",


    roomDirection:"horizontal",
    DragScene:(dy:number,dx:number)=>{}
}

const ScheduleContext = React.createContext<providerValue>(defaultSettings);

function useSchedule() {
  return useContext(ScheduleContext);
}

function ScheduleProvider(props: ScheduleproviderProps) {
    const {children} = props
    const children2:any=children
    
    var DragScene=(dy:number,dx:number)=>{};
    if (children2 ?.ref){
        DragScene=(dy:number,dx:number)=>{            
            children2.ref.current.scrollBy(dy,dx);
        }
    } 


    const value: providerValue = {
        rowHeight:props.rowHeight,
        minuteWidth:props.minuteWidth,
        lineGap:props.lineGap,

        titleSize:props.titleSize,
        timeSize:props.timeSize,

        startMinute:props.startMinute,
        endMinute:props.endMinute,

        dayType:props.dayType,
        roomDirection:props.roomDirection,

        DragScene,
    };


  return (
    <ScheduleContext.Provider value={value} >
        {children}
    </ScheduleContext.Provider>);
}

ScheduleProvider.defaultProps={
    ...defaultSettings
}

export {useSchedule,defaultSettings};
export type {providerValue};
export default ScheduleProvider;
