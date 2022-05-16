import { ScheduleItem } from '../Core/Schedule'


function timeToString(time:number){  
    if (isNaN(time) || time<0){
        throw 'time should be a positive integer not be negative' 
    }
    var hour=Math.floor(time/60);
    var min=time%60;
    return ((hour/10)<1 ? '0'+hour : `${hour}`) +":"+ ((min/10)<1 ? '0'+min : `${min}` ) ;
    
}
function floorTime(time:Date,minute:number){
    if (isNaN(minute) || minute<=0){
        throw 'minute must be >0' 
    }
    return new Date(Math.floor(time.getTime()/(minute*60000))*(minute*60000))
}

function SameDay(time1:Date,time2:Date){
    return time1.getFullYear()===time2.getFullYear()&&
    time1.getMonth()===time2.getMonth() &&
    time1.getDate()===time2.getDate()
}

function Overlap(start1:Date,end1:Date,start2:Date,end2:Date){
    const start1T = start1.getTime();
    const end1T = end1.getTime();
    const start2T = start2.getTime();
    const end2T = end2.getTime();
    return ( start2T < start1T && start1T< end2T ) || 
            ( start2T < end1T && end1T< end2T )    || 
            ( start1T < start2T && start2T< end1T )||
            (start1T == start2T); 
}

function TimeAtstart(time:Date){
    return new Date(time.getFullYear(),time.getMonth(),time.getDate());
}

export {timeToString,floorTime,SameDay,Overlap,TimeAtstart}