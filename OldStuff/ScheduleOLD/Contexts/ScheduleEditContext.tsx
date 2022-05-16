import React, { useContext, useEffect, useRef, useState } from "react";
import Schedule from "../Core/Schedule";
import {ScheduleProps} from '../Core/Schedule';


interface ScheduleEditProviderProps extends ScheduleProps{

    children?: React.ReactNode | React.ReactNode[];
}

interface ContextTypes{
    editable:boolean
    MoveHorizontally:(id: number, deltaStart: number, deltaDuration: number) => void
    storeDayReference:(day:Date,room:string,ref:any)=>void
    getItemFromBoundingBox:(mouseY:number)=>{day:Date,room:string}
    moveVertically:(id:number,day:Date,room:string)=>void
    getMovingID:(testId:number)=>boolean
    calenderRef:any
}

const value={
    editable:true,
    MoveHorizontally:()=>{},
    storeDayReference:()=>{},
    moveVertically:()=>{},
    getItemFromBoundingBox:()=>{return {day:new Date(),room:""}},
    getMovingID:()=>{return false},
    calenderRef:null
}

const ScheduleContextEdit = React.createContext<ContextTypes>(value);

function useScheduleEdit() {
  return useContext(ScheduleContextEdit);
}

function ScheduleEditProvider(props:ScheduleEditProviderProps){
    const {children} = props

    const [events,setEvents]=useState(props.events);
    const [boundingBoxes,setBoundingBoxes] = useState<{day:Date,room:string,ref:any}[]>( [] );
    const [movingID,setMovingID] = useState(-1);
    const calenderRef=useRef(null);
  
    const storeDayReference=(day:Date,room:string,ref:any)=>{        
      setBoundingBoxes(currentBoxes=>{
        var found=false;
        var newBoxes=[];
        currentBoxes.forEach((e)=>{
          if (e.day.getTime()==day.getTime() && e.room==room){
              newBoxes.push({day:day,room:room,ref:ref});
              found=true;
          }else{
              newBoxes.push(e);
          }
        });
        if (!found){newBoxes.push({day:day,room:room,ref:ref});}
        return newBoxes;
      });
      
    }
    const getItemFromBoundingBox=(mouseY:number)=>{
        const caltemp:any = calenderRef;
        var selectedbox={day:new Date(),room:""}
        boundingBoxes.forEach(box=>{
            const temp:any=box;
            const boundingbox=temp.ref.current.getBoundingClientRect()
            if (mouseY>=boundingbox.y && mouseY<=boundingbox.y+boundingbox.height){
                selectedbox={day:box.day,room:box.room}
            }
        }

        )
        return selectedbox;
    }
    const getMovingID=(testId:number)=>{
        return movingID===testId;
    }
    const MoveHorizontally=(id:number,deltaStart:number,deltaDuration:number)=>{    
        //new Date(props.data.start.getTime() + deltaStart*60000),
        //props.data.duration+deltaDuration);        
        setEvents(events=>events.map(event=>
            event.id==id?
            {...event,
                start:new Date(event.start.getTime() + deltaStart*60000),
                duration:event.duration+deltaDuration}
            :
            event
        ))
        const copy:any=calenderRef
    }
    const moveVertically=(id:number,day:Date,room:string)=>{        
        setEvents(events=>events.map(event=>
            event.id==id?
            {...event,
                start:new Date(day.getFullYear(),
                                day.getMonth(),
                                day.getDate(),
                                event.start.getHours(),
                                event.start.getMinutes(),
                                event.start.getSeconds())
               ,room:room}
            :
            event
        ))
        setMovingID(id);
        const copy:any=calenderRef
    }



    const context={
        ...value,
        calenderRef,
        MoveHorizontally:MoveHorizontally,
        storeDayReference:storeDayReference,
        getItemFromBoundingBox:getItemFromBoundingBox,
        moveVertically:moveVertically,
        getMovingID:getMovingID,
    }

    return(
        <ScheduleContextEdit.Provider value={context}>
            <Schedule {...props} events={events}/>
        </ScheduleContextEdit.Provider>
    );
}

export {useScheduleEdit,ScheduleContextEdit};
export default ScheduleEditProvider;