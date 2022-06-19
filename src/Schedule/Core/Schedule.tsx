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
  //Structure covers layout days and rooms avaliable for each day
  var structure = props.structure
  if (!structure && props.days && props.timetables){
    structure = StructureFromDaysTimetable(props.days,props.timetables);
  }

  //set the layout properties
  const cssvar={ 
    "--daytitlewidth": props.dayTitleWidth,
    "--rowtitlewidth":props.rowTitleWidth
    } as React.CSSProperties

  /**@label reference the whole schedule */
  var ScheduleItem= useRef(null);

  /**@label The data on the popped out element */
  var poppedData:ScheduleItem |null ;
  /**@label Set the data on the popped out element */
  var setPoppedData:React.Dispatch<React.SetStateAction<ScheduleItem|null>>;
  [poppedData, setPoppedData] = useState<ScheduleItem|null>(custom);

  /**@label The offset from the mouse for the popped element */
  var poppedOffset:{x:number,y:number};
  /**@label Set the offset from the mouse for the popped element */
  var setPoppedOffset:React.Dispatch<React.SetStateAction<{x:number,y:number}>>;
  [poppedOffset,setPoppedOffset] = useState<{x:number,y:number}>({x:50,y:50});

  /**@label Mouse location */
  var mouseLoc:{x:number,y:number};
  /**@label set mouse location */
  var setMouseLoc:React.Dispatch<React.SetStateAction<{x:number,y:number}>>;
  [mouseLoc,setMouseLoc] = useState({x:0,y:0});

  /**@label Arrays of events grouped by the start time of the respective day using .getTime() */
  var splitdata:{[key: number]: ScheduleItem[]} ={}
  if (structure){
    structure.forEach(x=>{
      splitdata[TimeAtstart(x.day).getTime()] = props.events.filter(e=>SameDay(e.start,x.day))
    })
  }
  
  /**@label Arrays of events grouped by the start time of the respective day using .getTime() */
  var eventDataByDay:{[key: number]: ScheduleItem[]};
  var setEventDataByDay:React.Dispatch<React.SetStateAction<{[key: number]: ScheduleItem[]}>>;
  [eventDataByDay,setEventDataByDay] = useState<{[key: number]: ScheduleItem[]}>(splitdata);

  /**
   * Called when mouse moment on the schedule,
   * Either moves the popped item if there is one
   * or the screen if not.
   * @param e MouseEvent
   * @returns none
   */
  const scrollHorizontal=(e:MouseEvent)=>{  
    //Only take action if mouse button pressed  
    if (e.buttons!=1){return;}  

    //if there is no popped element scroll the schedule
    if (poppedData==null){
      if (ScheduleItem?.current===null){return;}
      (ScheduleItem.current as any).scrollBy(-e.movementX,-e.movementY);
    }  



    //if there is a popped element
    if (poppedData!=null){
      console.log("scrolling");

      //update the mouse location for the popped location
      setMouseLoc({x:e.nativeEvent.pageX,y:e.nativeEvent.pageY});

      //get the elements that are below the mouse
      var items=document.elementsFromPoint(e.nativeEvent.pageX,e.nativeEvent.pageY);
      var timeTableType:string="";
      var date:number=0;
      var rowName:string="";
      var offset:number=0;

      //Iterate through the elements below the mouse
      for (const element of items) {
        if (element.classList.contains("rowWrapper")){
          //get the timetable type staff activity...
          timeTableType=(element as any).dataset.timetable;  
          //get the date of the hovered element        
          date=Number((element as any).dataset.date);   
          //get the offset from the left (to calc time)       
          offset=element.getBoundingClientRect().left;          
          break;
        }
        if (element.classList.contains("row")){
          //get the row name room...
          rowName=(element as any).dataset.rowname
        }
      }
      
      
      if (timeTableType===poppedData.type){
        var poppedDuration = poppedData.end.getTime()-poppedData.start.getTime()
        //calculate start time (start of day)
        var start = 
            date+
              (
                //mouse offset, bounding box offset, mouse inside popped (all in px)
                (e.nativeEvent.pageX-offset-poppedOffset.x)
                // convert px to ms
                /props.minuteWidth + props.startMinute) *60000
        /**@label Start date for the inserted popped element to start */
        var startDate= floorTime(new Date(start),5);
        /**@label New event data */
        var newData={
          ...poppedData,
          start:startDate,
          end:new Date(startDate.getTime()+poppedDuration),
          row:rowName
        }    
        //add the new event to the data    
        setEventDataByDay(
          {
            ...eventDataByDay,
            [date]:[...eventDataByDay[date],newData]
          }
          );
        //clear data from popped as it is now fixed in place
        //TODO check if this is needed
        setPoppedData(null);
      }
    }
  }

  /**
   * Function to pass state up, when an event is moved around the event is saved.
   * @remark Not to be used to pass info between days as will cause a duplication
   *          instead //TODO
   * @param start old event start time
   * @param id 
   * @param data new event data
   */
  const saveChange = (start:Date,id:number,data:ScheduleItem)=>{    
    setEventDataByDay( (info:{ [key: number]: ScheduleItem[]; })=>
        {
          var location = TimeAtstart(start).getTime();
          return{
          ...info,
          [location]: info[location].map((x:any)=> x.id ===id?data:x)
        }}
    )
  }

  /**
   * Get the last moved element, on re-render (moving between rows) 
   * the element looses it's state but the user should continue moving the class time 
   * @returns 
   */
  const lastMoved = ()=>{
    if (poppedData){
      return poppedData.id;
    }else{
      return -1;
    }
  }

  /**
   * Once the last moved element (see above) 
   * has regained it's state can clear memory
   */
  const clearLastMoved=()=>{
    setPoppedData(null);
  }
  const popoutValue = (data:ScheduleItem)=>{
    console.log(data);
    
    setPoppedData(data);
    //remove old
    setEventDataByDay( (info:any)=>
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
        clearGlobalLastMoved={clearLastMoved}
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
                      events={eventDataByDay[day.day.getTime()]}/>
                    )
              :""
            }
        </div>
        {
          poppedData!=null?
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