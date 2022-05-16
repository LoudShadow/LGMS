import { Timetable } from "../Core/Schedule";

function StructureFromDaysTimetable(Days:Date[],Timetable:Timetable[]){    
    var layout=Days.map(x=>{return {
            day:x,
            timetables: Timetable
            }}
        );
    return layout;
    
}


export {StructureFromDaysTimetable}