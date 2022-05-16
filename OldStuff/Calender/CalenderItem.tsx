import React, { BaseSyntheticEvent, useState } from 'react'
import calStyles from './Calender.module.css'
import CSS from 'csstype';
import Typography from '@mui/material/Typography'
import {roundTime} from './Helpers/time'
import { fontSize } from '@mui/system';
import { endianness } from 'os';
interface ActivityClassItem{
    id:number;
    style:CSS.Properties;

    increment?:number;
    rowHeight?:number;
    startOffset?:number;

    start:Date;
    duration:number;
    title:string;
    room:string;

    draggable?:boolean;
    editData:any;
    searchFunctions?:any;
    updateLight?:{
        H?:(id:number,start:Date,duration:number)=>void
        L?:(id:number,start:Date,duration:number)=>void
    };
}

var fontSizeContraction=6;
var fontSizeContractionTime=7;

//swim  006DA7

// Mind and body  01ACA3


const ClassColors=[
    ['rgb(179,210,54)','rgba(179,210,54,0.25)'],
    ['rgb(1,172,163)','rgba(1,172,163,0.25)'],
    ['rgb(1,172,163)','rgba(1,172,163,0.25)'],
    ['rgb(121,41,140)','rgba(121,41,140,0.25)'],
    ['rgb(121,41,140)','rgba(121,41,140,0.25)'],
    ['rgb(245,145,31)','rgba(245,145,31,0.25)']
]




function CalenderItem(props:ActivityClassItem) {
    const [colors,setColors]=useState(ClassColors[Math.floor(Math.random() * ClassColors.length)])  

    const increment= props.increment ?? 1;
    const rowHeight= props.rowHeight ?? 100;
    const startOffset= props.startOffset ?? 0;


    const startMinute=
        Math.floor((
        props.start.getHours()*60 + 
        props.start.getMinutes()-startOffset)
        /5)*5;
    const duration=
            Math.floor(props.duration/5)*5;
    const endMinute=startMinute+duration;
    const offset=(startMinute)*increment
    const width= (endMinute-startMinute)*increment;
    
    const [dragging,setDragging]=useState(props.draggable);
    const [sizing,setSizing]=useState(props.draggable);
    const [side,setSide]=useState("all");

    var end = new Date(props.start.getTime()+new Date(0,0,0,0,duration,0).getTime());

    
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
        
    }
    const handleDrag=(e:any)=>{
        e.stopPropagation();
        if (!dragging || ! sizing){return;}
        //e.movementX
        //e.movementY
        
        var deltaStart=0;
        var deltaDuration=0;

        if (side==='left'){
            deltaStart=(e.movementX/increment)
            deltaDuration=-(e.movementX/increment)
        }
        else if (side==='right'){
            deltaStart=0;
            deltaDuration=(e.movementX/increment)
        }else{
            deltaStart=(e.movementX/increment)
            deltaDuration=0
            if (e.nativeEvent.layerY<-e.target.offsetTop){
                var {room,day} = props.searchFunctions.roomPrev(props.start,props.room)
                if (room!=props.room){
                    props.editData(props.id,room,day)
                }
            }
            if (e.nativeEvent.layerY>(e.target.parentElement.offsetHeight-e.target.offsetTop)  ){
                var {room,day} = props.searchFunctions.roomNext(props.start,props.room);

                props.editData(props.id,room,day);
                if (room!=props.room){
                    props.editData(props.id,room,day)
                }
            }
        }
        if (props.updateLight?.H){
            
            props.updateLight.H(
                props.id,
                new Date(props.start.getTime() + deltaStart*60000),
                props.duration+deltaDuration);
        }

        // e.clientX
    }

  return (
    <div className={calStyles.item+" "+(sizing?calStyles.sizable:"")+" "+(dragging?calStyles.dragging:"")} 
        style={{
            ...props.style,
            left:`calc(${offset}px + 2em)`,
            width:`${width}px`,
            backgroundColor:colors[0],
            borderColor:colors[1],
            }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDrag}
        //onMouseLeave={handleDragEnd}
        onClick={()=>setSizing(e=>!e)}
        >
        <Typography variant="h6"
            style={{
                lineHeight:1.3,
                fontSize:(rowHeight/fontSizeContraction)+'px'  
            }}
            >{props.title}</Typography>
        <Typography variant="subtitle1"
            style={{
            fontSize:(rowHeight/fontSizeContractionTime)+'px'}}
        >
            
            {roundTime(props.start,5).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            -
            {roundTime(end,5).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</Typography>
    </div>
  )
}

export default CalenderItem