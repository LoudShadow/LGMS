import { ScheduleItem } from '../Core/Schedule'


function timeToString(time:number){    
    var hour=Math.floor(time/60);
    var min=time%60;

    return ((hour/10)<1 ? '0'+hour : `${hour}`) +":"+ ((min/10)<1 ? '0'+min : `${min}` ) ;
    
}

function roundTime(time:Date,minute:number){
    return new Date(Math.floor(time.getTime()/(minute*60000))*(minute*60000))
}

function StartEndTime(classes:ScheduleItem[]){
    var early=24*60;
    var late=0;
    for (var i of classes){
        var start = (i.start.getHours()*60)+i.start.getMinutes();
        
        var end=start+i.duration;
        early=Math.min(early,start);
        late=Math.max(late,end);
    }
    early= Math.floor(early/60)*60;
    late= Math.ceil(late/60)*60;  
      
    return {early,late};
}

function SameDay(time1:Date,time2:Date){
    return time1.getFullYear()===time2.getFullYear()&&
    time1.getMonth()===time2.getMonth() &&
    time1.getDate()===time2.getDate()
}

export {timeToString,StartEndTime,roundTime,SameDay}