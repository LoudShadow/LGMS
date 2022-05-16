import React, { useEffect, useRef, useState,MouseEvent } from "react";
import { ScheduleItem } from "./Schedule";
import { useSchedule } from "../Contexts/ScheduleContext";

import style from "./css/Timetable.module.css";
import { Button, Typography } from "@mui/material";
import Row from "./Row";
import RowStyle from "./css/Row.module.css";
interface TimetableProps {
  name: string;
  day: Date;
  rows: string[];
  events: ScheduleItem[];
}

function Timetable(props: TimetableProps) {
  const { rowHeight, rowDirection,minItemWidth,startMinute,endMinute,getGlobalLastMoved,clearGlobalLastMoved } = useSchedule();

  const [open, setOpen] = useState(false);
  const openCloseStyle = open
    ? { height: `${rowHeight * props.rows.length}px` }
    : { height: `0px` };

  const [information, setInformation] = useState(props.events);
  const [offsets,setOffsets] = useState({id:-1,dStart:0,dEnd:0});
  const [lastMoved,setLastmoved] = useState(-1);

    useEffect(()=>{
        if (information.length != props.events.length){
            setInformation(props.events);
        }
    },[props.events])

  //TODO clear up offsetot dont need to be recordign all of them
  const solidMoveHorizontal= (id:number,deltaStart:number,deltaEnd:number) => {
    setInformation(x=>
        x.map(item=>
            {
            if (item.id!==id){return item}
            
            var start=new Date(item.start.getTime()+ (deltaStart*60000));
            var end=new Date(item.end.getTime()+ (deltaEnd*60000));

            var startMins=start.getHours()*60+start.getMinutes();
            var endMins=end.getHours()*60+end.getMinutes();
            
            //prevent going tout of bounds
            if (startMins<startMinute){return item}
            if (endMins>endMinute){return item}
            if (endMins-startMins<minItemWidth){return item}
            return{
                ...item,
                start:start,
                end:end
            }
            }
            ))
  }
  const moveHorizontal = (id:number,deltaStart:number,deltaEnd:number) => {
    setOffsets(
        x=> {
            var value
            if (x.id===id){
                value={id:id,dStart:x.dStart+deltaStart,dEnd:x.dEnd+deltaEnd}
            }else{
                value={id:id,dStart:deltaStart,dEnd:deltaEnd}
            }
            var largeDeltaStart = Math.sign(value.dStart)*Math.floor(Math.abs(value.dStart)/5)*5;
            var largeDeltaEnd = Math.sign(value.dEnd)*Math.floor(Math.abs(value.dEnd)/5)*5;
            value={
                id:value.id,
                dStart:(value.dStart-largeDeltaStart),
                dEnd:(value.dEnd-largeDeltaEnd),
            }
            if (largeDeltaStart+largeDeltaEnd !=0){ //start and end cant be +- 5
                solidMoveHorizontal(id,largeDeltaStart,largeDeltaEnd);
            }
            return value;
        } 
    )
  } 
  const clearOffsets = (id:number)=>{
      setOffsets({id:-1,dStart:0,dEnd:0})
  }
  const getLastMoved= ()=>{
      if (lastMoved!=-1){return lastMoved}
      return getGlobalLastMoved();
  }
  const clearLastMoved= ()=>{
      setLastmoved(-1);
      clearGlobalLastMoved();
  }

  const popoutValue=(e:MouseEvent)=>{
    if (lastMoved>0 && e.buttons===1){
        setLastmoved(-1);
    }
  }
    


  const GetNextVertical=(id:number,rowOffset:number,currentValue:string)=>{
    var current=props.rows.indexOf(currentValue);
    var next = current+=rowOffset;
    
    if (next>=0 && next< props.rows.length){
        
        var nextRow=props.rows[next]
        setInformation(values=>
            values.map(x=>
                x.id===id?
                    {
                        ...x,
                        row:nextRow
                    }
                :
                x
            )
        )
        setLastmoved(id);
        return true;
    }
    return false; // goes outside bounding box of the timetable
    
  }

  return (
    <div className={style.Timetable}>
      <div className={style.TimetableHeader}>
        <div className={style.TimetableHeaderContent}>
          <button
            className={style.TimetableHeaderButton}
            onClick={() => setOpen((val) => !val)}
          >
            {open ? "-" : "+"}
          </button>
          {props.name}
        </div>
      </div>
      <div className={style.TimetableContent}>
        <div className={style.RowTitleWrapper} style={{ ...openCloseStyle }}>
          {props.rows.map((e) => (
            <div
              className={
                style.RowTitle +
                " " +
                (rowDirection == "vertical" ? style.Vertical : "")
              }
              style={{ height: `calc(${rowHeight}px - 1px)` }}
              key={e}
            >
              <Typography variant="h6" color="initial">
                {e}
              </Typography>
            </div>
          ))}
        </div>
        <div 
            className={"rowWrapper "+style.RowWrapper} //has rowWrapper for code id
            style={{ ...openCloseStyle }}
            onMouseLeave={popoutValue}
            data-timetable = {props.name}
            data-date = {props.day.getTime()}
            >
          {props.rows.map((e) => (
            <Row 
                name={e} 
                key={e}
                events={information.filter((x) => x.row === e)}
                functions={
                    {
                        moveHorizontal:moveHorizontal,
                        clearOffsets:clearOffsets,
                        GetNextVertical:GetNextVertical,
                        getLastMoved:getLastMoved,
                        clearLastMoved:clearLastMoved
                    }}
                />
        ))}
        </div>
      </div>
    </div>
  );
}
export default Timetable;
