import {ScheduleItem} from '../Schedule'
import { SameDay } from '../../util/time'

function StructureFromDaysRooms(Days:Date[],rooms:string[]){
    var layout=Days.map(x=>{return {
            day:x,
            rooms: rooms.map(x=>x)
            }}
        );
    return layout;
}

function StructureFromEvents(events:ScheduleItem[]){
    var structure=[]
    for (var event of events){
        var foundDay=false;
        for (var day of structure){
            if (SameDay(day.day,event.start)){
                foundDay=true;
                var foundRoom=false;
                for (var room of day.rooms){
                    foundRoom= foundRoom || room===event.room;
                }
                if (!foundRoom){
                    day.rooms.push(event.room)
                }
            }
        }

        if (!foundDay){
            structure.push({
                day:event.start,
                rooms:[event.room]
            })
        }
    }
    
    return structure;
}
export {StructureFromDaysRooms,StructureFromEvents}