//Sort into days of the week

import { ScheduleItem } from '../Core/Schedule'

interface DaySort{
    dayNum:number;
    day:string;
    classes?:ScheduleItem[];
}

interface RoomSort{
    room:string;
    classes?:ScheduleItem[];
}

var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function daysOfTheWeek(array:ScheduleItem[]){
    const dayMap = new Map<number,ScheduleItem[]>();
    var i:ScheduleItem
    for (i of array){
        var day=i.start.getDay()
        if (dayMap.has(day)){
            dayMap.get(day)?.push(i)
        }
        else{
            dayMap.set(day,[i])
        }
    }
    var result:DaySort[]=[]
    for (var j of dayMap.keys()){
        result.push({
            dayNum:j,
            day:dayOfWeek[j],
            classes:dayMap.get(j)
        })
    }
    result.sort(x=> x.dayNum);
    return result;
}


function groupByRoom(array:ScheduleItem[]){
    const dayMap = new Map<string,ScheduleItem[]>();
    var i:ScheduleItem
    for (i of array){
        var room=i.room
        if (dayMap.has(room)){
            dayMap.get(room)?.push(i)
        }
        else{
            dayMap.set(room,[i])
        }
    }
    var result:RoomSort[]=[]
    for (var j of dayMap.keys()){
        result.push({
            room:j,
            classes:dayMap.get(j)
        })
    }
    result.sort((a,b)=>  ('' + a.room).localeCompare(b.room));
    return result;

}
export {daysOfTheWeek,groupByRoom};