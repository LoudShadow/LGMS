import React from "react";
import { ScheduleItem } from "./Schedule";
import style from "./css/Row.module.css";
import { useSchedule } from "../Contexts/ScheduleContext";
import Typography from "@mui/material/Typography";
import ScheduleEvent from "../Events/ScheduleEvent";
import { MaxHeightScheduling } from "../util/scheduling";

interface rowProps {
  name: string;
  events: ScheduleItem[];
  functions:any;
}

function Row(props: rowProps) {
  const { rowDirection, rowHeight } = useSchedule();
  const eventData = MaxHeightScheduling(props.events);
  var max = 1;
//   if (eventData.length>0){
//     max=eventData.reduce((max,current)=>max.rowCount>current.rowCount?max:current,eventData[0]).rowCount
//   }

  
  
  return (
    <div className={"row "+style.Row} 
        style={{ height: `${max*rowHeight - 1}px` }}
        data-rowname={props.name}
        >
      <>
        {eventData.map((x) => (
          <ScheduleEvent 
            key={x.event.id}
            data={x.event} 
            totalRows={x.rowCount} 
            rowNumber={x.row} 
            functions={props.functions}
            />
        ))}
      </>
    </div>
  );
}

export default Row;
