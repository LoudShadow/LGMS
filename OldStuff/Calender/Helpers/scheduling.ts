
import {ActivityClass} from '../Calender';
import {roundTime} from './time';
function intervalPartitioning(classes:ActivityClass[]){
    
    classes.sort((a,b)=> 
        a.start.getTime()-b.start.getTime());

    var slots:ActivityClass[][]=[];
    classes.forEach(x=>{
        var current=roundTime(x.start,5);  
        var found=false;
        var i =0;
        while (!found){
            if (i===slots.length){
                slots.push([x]);
                found=true;
            }else{
                var last = slots[i][slots[i].length-1] 
                var ending = roundTime(last.start,5).getTime() + Math.floor(last.duration/5)*300000
                if (ending<=current.getTime()){
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



export {intervalPartitioning}