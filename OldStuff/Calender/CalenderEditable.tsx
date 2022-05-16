import React, { useState } from 'react'
import Calender from './Calender'

const CalenderData2=[
    {
        id:1,
        start:new Date(2022, 5, 1, 12, 0, 0, 0),
        duration:60,
        title:"Body Pump",
        room:"Studio"
    },
    {
        id:2,
        start:new Date(2022, 5, 1, 12, 0, 0, 0),
        duration:60,
        title:"Body Pump",
        room:"2-court"
    },
    {
        id:3,
        start:new Date(2022, 5, 1, 12, 0, 0, 0),
        duration:100,
        title:"Body Pump",
        room:"4-court"
    },
    {
        id:4,
        start:new Date(2022, 5, 1, 13, 0, 0, 0),
        duration:60,
        title:"Body Pump",
        room:"4-court"
    },           
    {
        id:5,
        start:new Date(2022, 5, 1, 14, 0, 0, 0),
        duration:60,
        title:"Body Pump",
        room:"4-court"
    } ,          
    {
        id:6,
        start:new Date(2022, 5, 1, 15, 0, 0, 0),
        duration:60,
        title:"Simon",
        room:"4-court"
    }

]



function CalenderEditable() {
    const [data,setData]=useState(CalenderData2);

    const update=(id:number,room:string, start:Date,)=>{
        var newInfo=data.map(
                        event=>event.id===id?
                            {
                                ...event,
                                room:room,
                                start:start,
                                draggable:true
                            }
                        :{
                            ...event,
                            draggable:false
                            }
                    )
        setData(newInfo)
        
    }

  return (
    <Calender 
        data={data}
        startTime={9*60+30}
        endTime={21*60+30}
        editData={update}
        />
  )
}

export default CalenderEditable