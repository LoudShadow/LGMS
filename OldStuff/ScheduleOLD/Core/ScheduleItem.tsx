import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import styles from "./ScheduleItem.module.css";
import CSS from "csstype";
import Typography from "@mui/material/Typography";

import { roundTime, SameDay } from "../util/time";
import { ScheduleItem } from "./Schedule";
import { useSchedule } from "../Contexts/ScheduleContext";
import { useScheduleEdit } from "../Contexts/ScheduleEditContext";

interface ScheduleItemProps {
  data: ScheduleItem;

  totalRows: number;
  rowNumber: number;
}

//swim  006DA7

// Mind and body  01ACA3

const ClassColors = [
  ["rgb(179,210,54)", "rgba(179,210,54,0.25)"],
  ["rgb(1,172,163)", "rgba(1,172,163,0.25)"],
  ["rgb(1,172,163)", "rgba(1,172,163,0.25)"],
  ["rgb(121,41,140)", "rgba(121,41,140,0.25)"],
  ["rgb(121,41,140)", "rgba(121,41,140,0.25)"],
  ["rgb(245,145,31)", "rgba(245,145,31,0.25)"],
];

function ScheduleEvent(props: ScheduleItemProps) {
  const [colors, setColors] = useState(
    ClassColors[Math.floor(Math.random() * ClassColors.length)]
  );

  const {
    startMinute,
    endMinute,
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
  const duration = Math.floor((props.data.duration) / 5) * 5;
  // const localEndMinute = localStartMinute + duration
  const localEndMinute = Math.floor(
    ( props.data.start.getHours() * 60 
    + props.data.start.getMinutes() - startMinute +props.data.duration
    ) / 5
  ) * 5;
  const offset = localStartMinute * minuteWidth;
  const width = (localEndMinute - localStartMinute) * minuteWidth; 

  const [dragging,setDragging]=useState(false);
  const [sizing,setSizing]=useState(false);
  const [side,setSide]=useState("all");

  var element=useRef<HTMLDivElement>(null);
  var isMoving:any;
  useEffect(()=>{
    if (isMoving){
      if (isMoving(props.data.id)){
        setDragging(true);
        setSizing(true);
        setSide('all')
      }
    }
  },[])

  var end = new Date(
    props.data.start.getTime() + new Date(0, 0, 0, 0, duration, 0).getTime()
  );




  const values = useScheduleEdit();
  var editable= !!values;

  if (!editable){
    return (
      <div
        className={styles.item}
        ref={element}
        style={{
          left: `calc(${offset}px + 2em)`,
          width: `${width}px`,
          backgroundColor: colors[0],
          top: ((100 / props.totalRows) * props.rowNumber) + '%',
          bottom: (100 - (100 / props.totalRows) * (props.rowNumber + 1)) + '%'
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
          {roundTime(props.data.start, 5).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          -
          {roundTime(end, 5).toLocaleString([], {
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
    );
  }
  //This is the cool edity bit (shame about the duplication ill see what I can do)

  // const [dragging,setDragging]=useState(false);
  // const [sizing,setSizing]=useState(false);
  // const [side,setSide]=useState("all");

  const {MoveHorizontally,getItemFromBoundingBox,moveVertically,getMovingID} =values;
  isMoving=getMovingID;
  const handleDragStart=(e:any)=>{
    e.stopPropagation();

    if (Math.abs(e.target.clientHeight/2 - e.nativeEvent.layerY) <80){
        if (e.nativeEvent.layerX<15){                
            setSide("left");                
            setDragging(true);
        }
        else if (Math.abs(e.target.clientWidth - e.nativeEvent.layerX) <15){
            setSide("right");
            setDragging(true);
        }
        else{                
            setSide("all");
            setDragging(true);
        }
    }else{
        setDragging(false);
    }
  }
  const handleDragEnd=(e:any)=>{
      e.stopPropagation();        
      setDragging(false);
      setSizing(e=>!e);
  }
  const handleDrag=(e:any)=>{  
      e.stopPropagation();
      if (!dragging || ! sizing){return;}

      var deltaStart=0;
      var deltaDuration=0;
      if (side==='left'){
          deltaStart=(e.movementX/minuteWidth)
          deltaDuration=-deltaStart
      }
      else if (side==='right'){
        deltaStart=0;
        deltaDuration=(e.movementX/minuteWidth)
          
      }else{
        deltaStart=(e.movementX/minuteWidth)
        deltaDuration=0
      }
      if (props.data.duration+deltaDuration < 30){
        deltaDuration=0;
      }

      //Check is defined
      if (element?.current?.parentElement){
        var parentBounding=element.current.parentElement.getBoundingClientRect();
        var mouseY=e.nativeEvent.pageY;
        //if outside parents bounding box
        if (side=="all" && (mouseY<parentBounding.top || mouseY>parentBounding.top+parentBounding.height) ){
          const {day,room}=getItemFromBoundingBox(e.nativeEvent.clientY);
          moveVertically(props.data.id,day,room);
        }
        MoveHorizontally(props.data.id,deltaStart,deltaDuration);


        //TODO check if outside box before calling box
        //TODO validate results (null)
        
        
      }
      // e.clientX
  }





  return (
    <div
      className={styles.item+" "+(sizing?styles.sizable:"")+" "+(dragging?styles.dragging:"")}
      ref={element}
      style={{
        left: `calc(${offset}px + 2em)`,
        width: `${width-4}px`,
        backgroundColor: colors[0],
        top: ((100 / props.totalRows) * props.rowNumber) + '%',
        bottom: (100 - (100 / props.totalRows) * (props.rowNumber + 1)) + '%'
      }}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}

    >
      <Typography
        style={{
          lineHeight: 1.2,
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
        {roundTime(props.data.start, 5).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        -
        {roundTime(end, 5).toLocaleString([], {
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
  );




}

// ScheduleEvent.defaultProps={
//     totalRows:1,
//     rowNumber:1
// }

export default ScheduleEvent;
