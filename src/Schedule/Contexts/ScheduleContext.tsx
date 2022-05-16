import React,{useContext} from 'react'
import { ScheduleItem } from "../Core/Schedule";


interface providerValue {
  rowHeight:number;
  minuteWidth:number;
  lineGap:number;

  titleSize:number;
  timeSize:number;

  startMinute:number;
  endMinute:number;

  dayType:"weekday"|"date";  
  
  minItemWidth:number
  
  rowDirection:"horizontal"|"vertical"; 
  dayDirection:"horizontal"|"vertical"; 
  dayTitleWidth:string;
  rowTitleWidth:string;

  onChange: (start:Date,id:number,data:ScheduleItem)=>void
  setPopout:(data:ScheduleItem)=>void
  getGlobalLastMoved:()=>void
  clearGlobalLastMoved:()=>void
}
interface ScheduleproviderProps extends providerValue{

  children?: React.ReactNode | React.ReactNode[];
}
const defaultSettings:providerValue={
  rowHeight:60,
  minuteWidth:4,
  lineGap:15,

  titleSize:6,
  timeSize:5,

  startMinute:9*60,
  endMinute:21*60,
  dayType:"weekday",

  minItemWidth:30,

  rowDirection:"horizontal",
  dayDirection:"vertical",

  dayTitleWidth:"1.5em",
  rowTitleWidth:"3em",

  onChange:()=>{},
  setPopout:()=>{},
  getGlobalLastMoved:()=>{},
  clearGlobalLastMoved:()=>{},
}

const ScheduleContext = React.createContext<providerValue>(defaultSettings);

function useSchedule() {
  return useContext(ScheduleContext);
}


function ScheduleProvider(props: ScheduleproviderProps) {
  const {children} = props
  const children2:any=children
  
  const value: providerValue = {
      rowHeight:props.rowHeight,
      minuteWidth:props.minuteWidth,
      lineGap:props.lineGap,

      titleSize:props.titleSize,
      timeSize:props.timeSize,

      startMinute:props.startMinute,
      endMinute:props.endMinute,

      dayType:props.dayType,

      dayDirection:props.dayDirection,

      rowDirection:props.rowDirection,
      dayTitleWidth:props.dayTitleWidth,
      rowTitleWidth:props.rowTitleWidth,

      minItemWidth:props.minItemWidth,

      onChange:props.onChange,
      setPopout:props.setPopout,
      getGlobalLastMoved:props.getGlobalLastMoved,
      clearGlobalLastMoved:props.clearGlobalLastMoved,
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