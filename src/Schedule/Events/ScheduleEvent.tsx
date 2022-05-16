import React,{useState,MouseEvent, useRef, useEffect} from 'react'
import style from './css/ScheduleEvent.module.css'
import { ScheduleItem } from "../Core/Schedule";
import { useSchedule } from "../Contexts/ScheduleContext";
import Typography from '@mui/material/Typography'
import {floorTime} from '../util/time'

interface ScheduleItemProps {
    data: ScheduleItem;
    functions:any;
    totalRows: number;
    rowNumber: number;
  }
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
    var thisItem = useRef<HTMLDivElement>(null);
    const {
        startMinute,
        minuteWidth,
        titleSize,
        timeSize,
        rowHeight,
        onChange,
        setPopout,
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
    const offset = localStartMinute * minuteWidth;
    const width = (localEndMinute - localStartMinute) * minuteWidth; 

    const [side,setSide]=useState("all");
    const [hovered, sethovered] = useState(0);
    
    const [selected, setSelected] = useState(true);
    const [dragging,setDragging]=useState(true);

    //On render check that it is not a re-render for a newly moved item
    //Default assume moved to prevent a couple of frames of inactivity
    useEffect(()=>{
        if (props.functions.getLastMoved()!== props.data.id){
            setDragging(false);
            setSelected(false);
            props.functions.clearLastMoved();
        }
    },[]);

    const handleDragStart=(e:any)=>{
        //When the drag starts check if on the left right or center
        //The location of the drag sets how the item moves
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

    const moveItem=(e:MouseEvent)=>{  
        //Item should be full size if hovered and not clicked
        const item:any = thisItem.current
        if (!hovered && e.buttons===0){
            sethovered(2); 
        }else if (e.buttons===0){
            //If moved outside the original bounds then no-longer hover
            var rect = item.getBoundingClientRect();
            var mouseOffset= e.nativeEvent.clientY - rect.top;
            var rowHeight= (item.offsetHeight+1)/props.totalRows;
            var offset= (item.offsetHeight+1)/props.totalRows*props.rowNumber
            if (!(mouseOffset>offset && mouseOffset<(offset+rowHeight)) ){
                sethovered(x=>x-1);
            }else{
                sethovered(2); 
            }
        }else{
            sethovered(0);
        }

        if (!dragging || ! selected){return;}            
        e.stopPropagation();
        var deltaStart=0;
        var deltaEnd=0;
        if (side==='left'){
            deltaStart=(e.movementX/minuteWidth)
            deltaEnd=0
        }
        else if (side==='right'){
          deltaStart=0;
          deltaEnd=(e.movementX/minuteWidth)
            
        }else{
          deltaStart=(e.movementX/minuteWidth)
          deltaEnd=(e.movementX/minuteWidth)
        }        
        props.functions.moveHorizontal(props.data.id,deltaStart,deltaEnd);
        var notOutside=true;
        //If the mouse has moved outside of the row bounding box then move to the next row 
        if (thisItem?.current?.parentElement){
            var parentBounding=thisItem.current.parentElement.getBoundingClientRect();
            var mouseY=e.nativeEvent.pageY;
            if (side=="all"){
                if (mouseY<parentBounding.top){
                    notOutside=props.functions.GetNextVertical(props.data.id,-1,props.data.row);
                }
                if (mouseY>parentBounding.top+parentBounding.height){
                    notOutside=props.functions.GetNextVertical(props.data.id,1,props.data.row);
                }
            }
        }
        if (!notOutside){
            setPopout(props.data);
        }
    }

    //Stop dragging when the mouse is released
    const handleDragEnd=(e:any)=>{
        e.stopPropagation();        
        setDragging(false);
        props.functions.clearOffsets(props.data.id);
        onChange(props.data.start,props.data.id,props.data)
    }

    return (
        <div
            className={style.item
                +" "+(hovered?style.hovered:"")
                +" "+(selected?style.selected:"")
                +" "+(dragging?style.dragging:"")}
            style={{
            left: `${offset}px`,
            width: `calc(${width}px - 4px)`,
            backgroundColor: colors[0],
            top: ((100 / props.totalRows) * props.rowNumber) + '%',
            bottom: (100 - (100 / props.totalRows) * (props.rowNumber + 1)) + '%'
            }}
            onMouseMove={moveItem}
            onMouseLeave={(e)=>{sethovered(0);handleDragEnd(e);setSelected(false);}}
            onMouseDown={handleDragStart}
            onMouseUp={(e)=>{handleDragEnd(e);setSelected(e=>!e)}}
            
            ref={thisItem}
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
            {floorTime(props.data.start, 5).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })}
            -
            {floorTime(props.data.end, 5).toLocaleString([], {
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


export default ScheduleEvent