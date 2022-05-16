
import Row from '../Core/Row';
import {ScheduleItem} from '../Core/Schedule';
import { Overlap } from './time';

function intervalPartitioning(classes:ScheduleItem[]){
    
    classes.sort((a,b)=> 
        a.start.getTime()-b.start.getTime());

    var slots:ScheduleItem[][]=[];
    classes.forEach(x=>{
        var current =x.start.getTime()
        var found=false;
        var i =0;
        while (!found){
            if (i===slots.length){
                slots.push([x]);
                found=true;
            }else{
                var last = slots[i][slots[i].length-1] 
                if (last.end.getTime()<=current){
                    slots[i].push(x);
                    found=true;
                }
                else{
                    i++;
                }
            }
        }
    })   
    return slots; 

}

//going to need some item id priority scheduling or smt

interface MaxHeightResult{
    event:ScheduleItem;
    rowCount:number;
    row:number;
}

// With the item at startY,startX count the number of overlaps return {row,rowCount}
// row : total number of overlaps with Y < startY
// rowCount : total number of overlaps (incl itself)
function GetOverlapCounts(Schedule:ScheduleItem[][],startY:number,startX:number){
    var row=0;
    var rowCount=0;
    var item = Schedule[startY][startX];
    for (let i = 0; i < Schedule.length; i++) {
        for (let j = 0; j < Schedule[i].length; j++) {
            var current=Schedule[i][j];
            if (Overlap(item.start,item.end,current.start,current.end)){
                rowCount+=1;
                if (i<startY) row+=1;
                break;
            }
        }        
    }
    return {row:row,rowCount:rowCount};
}
//Is imperfect Not sure how to approach a better solution think about it later
//Cant even represent it with the 2 values specified
function MaxHeightScheduling(events:ScheduleItem[]):MaxHeightResult[]{
    var sorted=intervalPartitioning(events);
    var output:MaxHeightResult[]=[];
    sorted.forEach((items,i)=>{
        items.forEach((item,j)=>{
            var val=GetOverlapCounts(sorted,i,j);
            output.push( {...val, event:item} );
        })
    })
    return output;

}


export type {MaxHeightResult}
export {intervalPartitioning,MaxHeightScheduling}