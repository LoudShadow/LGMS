import React, { useRef,MouseEvent, useState, useEffect } from 'react';
import ScheduleProvider,{providerValue,defaultSettings} from '../Contexts/ScheduleContext';
import { StructureFromDaysTimetable } from '../util/CreateStructure';
import style from './css/Schedule.module.css';
import Day from './Day';
import { floorTime, SameDay, TimeAtstart } from '../util/time'; 
import TimeHeader from '../Structure/TimeHeader';
import HelperLines from '../Structure/HelperLines'; 
import ScheduleEvent from '../Events/ScheduleEvent';
import FreeScheduleEvent from '../Events/FreeScheduleEvent';
interface ScheduleItem{
  id:number;
  start:Date;
  end:Date;

  row:string;
  type:string;

  title:string;
  subtext?:string;
}

interface Timetable{
  //Each day is made from several timetables 
  //timetables can be navigated separately (x is the same)
  //Events cannot be moved between two different timetables
  // e.g. staff and activity timtable
  name:string;
  rows:string[];
}

interface ScheduleProps extends providerValue{
  events:ScheduleItem[];
  days?:Date[]; 
  timetables?:Timetable[]; 

  structure?:{            //the structure is pulled from the events            
    day:Date;
    timetables:Timetable[];     //represents the days and rooms as nested
  }[];
}

var custom={
  id:7,
  start:new Date(2022, 3, 25, 15, 0, 0, 0),
  end:new Date(2022, 3, 25, 17, 0, 0, 0),
  title:"Shitty Lane Swim",
  type:"Activity",
  row:"Main Pool"
}

function Schedule(props:ScheduleProps) {
  var structure = props.structure
  if (!structure && props.days && props.timetables){
    structure = StructureFromDaysTimetable(props.days,props.timetables);
  }
  const cssvar={ 
    "--daytitlewidth": props.dayTitleWidth,
    "--rowtitlewidth":props.rowTitleWidth
    } as React.CSSProperties

  var ScheduleItem= useRef(null);
  const [hasPopped,setHasPopped] = useState(true);
  const [poppedData, setPoppedData] = useState<any>(custom);
  const [poppedOffset,setPoppedOffset] = useState({x:50,y:50});
  const [mouseLoc,setMouseLoc] = useState({x:0,y:0});


  var splitdata:any ={}
  if (structure){
    structure.forEach(x=>{
      splitdata[TimeAtstart(x.day).getTime()] = props.events.filter(e=>SameDay(e.start,x.day))
    })
  }
  const [data,setData] = useState<any>(splitdata);

  const scrollHorizontal=(e:MouseEvent)=>{    
    if (e.buttons!=1){return;}  
    if (!hasPopped){
      if (ScheduleItem?.current===null){return;}
      (ScheduleItem.current as any).scrollBy(-e.movementX,-e.movementY);
    }  

    setMouseLoc({x:e.nativeEvent.pageX,y:e.nativeEvent.pageY});
    if (hasPopped){
      var items=document.elementsFromPoint(e.nativeEvent.pageX,e.nativeEvent.pageY);
      var timeTableType:string="";
      var date:number=0;
      var rowName:string="";
      var offset:number=0;
      console.log(items);
      
      for (const element of items) {
        if (element.classList.contains("rowWrapper")){
          timeTableType=(element as any).dataset.timetable;          
          date=Number((element as any).dataset.date);          
          offset=element.getBoundingClientRect().left;
          console.log("offset",offset);
          
          break;
        }
        if (element.classList.contains("row")){
          rowName=(element as any).dataset.rowname
        }
      }      
      if (timeTableType===poppedData.type){
        var difference = poppedData.end.getTime()-poppedData.start.getTime()
        var start = 
            date+
              (
                (e.nativeEvent.pageX-offset-poppedOffset.x)
                /props.minuteWidth + props.startMinute) *60000
        var startDate= floorTime(new Date(start),5);
        var newData={
          ...poppedData,
          start:startDate,
          end:new Date(startDate.getTime()+difference),
          row:rowName
        }        
        setData(
          {
            ...data,
            [date]:[...data[date],newData]
          }
          );
        setHasPopped(false);
      }
    }
  }
  const saveChange = (start:Date,id:number,data:ScheduleItem)=>{    
    setData( (info:any)=>
        {
          var location = TimeAtstart(start).getTime();
          return{
          ...info,
          [location]: info[location].map((x:any)=> x.id ===id?data:x)
        }}
    )
  }
  const lastMoved = ()=>{
    if (poppedData){
      return poppedData.id;
    }else{
      return -1;
    }
  }
  const clearLastMoved=()=>{
    setPoppedData(null);
  }
  const popoutValue = (data:ScheduleItem)=>{
    console.log(data);
    
    setPoppedData(data);
    setHasPopped(true);
    //remove old
    setData( (info:any)=>
        {
          var location = TimeAtstart(data.start).getTime();
          return{
          ...info,
          [location]: info[location].filter((x:any)=> data.id !==x.id)
        }}
    )

    const localStartMinute =
    Math.floor(
      ( data.start.getHours() * 60 
      + data.start.getMinutes() - props.startMinute
      ) / 5
        ) * 5;
    const localEndMinute = Math.floor(
        ( data.end.getHours() * 60 
        + data.end.getMinutes() - props.startMinute
        ) / 5
        ) * 5;
    const width = (localEndMinute - localStartMinute) * props.minuteWidth;
    setPoppedOffset({x:width/2,y:props.rowHeight/2});
  }

  return (
    <ScheduleProvider {...props} 
        onChange={saveChange}
        setPopout={popoutValue}
        getGlobalLastMoved={lastMoved}
        >

      <div 
        className={style.Schedule} 
        style={cssvar} 
        ref={ScheduleItem}
        onMouseMove={scrollHorizontal}
        >
        <TimeHeader/>
        <div className={style.Background}>
          <HelperLines/>
        </div>
        <div className={style.DayWrapper}>
            {
              !!structure?  // check structure is defined
                structure.map(day=>
                    <Day 
                      key={day.day.getTime()}
                      day={day.day}
                      timetable={day.timetables}   
                      events={data[day.day.getTime()]}/>
                    )
              :""
            }
        </div>
        {
          hasPopped?
              <div className={style.freeEvent}>
                <FreeScheduleEvent 
                  data={poppedData} 
                  functions={null} 
                  top={mouseLoc.y-poppedOffset.y} 
                  left={mouseLoc.x-poppedOffset.x}></FreeScheduleEvent>
            </div>
            :""
        }


      </div>
    </ScheduleProvider>

  )
}

Schedule.defaultProps={
  ...defaultSettings
}

export type {ScheduleItem,Timetable}
export default Schedule