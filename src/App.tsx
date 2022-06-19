import React from 'react';
import './App.css';
import Schedule from './Schedule/Core/Schedule';


const CalenderData2=[
  {
      id:1,
      start:new Date(2022, 3, 25, 11, 0, 0, 0),
      end:new Date(2022, 3, 25, 12, 0, 0, 0),
      title:"Functional Fit",
      type:"Activity",
      row:"Main Pool"
  },
  {
      id:2,
      start:new Date(2022, 3, 25, 12, 0, 0, 0),
      end:new Date(2022, 3, 25, 13, 0, 0, 0),
      title:"Lane Swim",
      type:"Activity",
      row:"Main Pool"
  },
  {
      id:3,
      start:new Date(2022, 3, 25, 12, 0, 0, 0),
      end:new Date(2022, 3, 25, 13, 30, 0, 0),
      title:"Public Swim",
      row:"Main Pool",
      type:"Activity",
      subtext:"(2 lanes)"
  },
  {
      id:4,
      start:new Date(2022, 3, 25, 13, 0, 0, 0),
      end:new Date(2022, 3, 25, 14, 0, 0, 0),
      title:"Lane Swim",
      type:"Activity",
      row:"Main Pool"
  },           
  {
      id:5,
      start:new Date(2022, 3, 25, 13, 30, 0, 0),
      end:new Date(2022, 3, 25, 15, 0, 0, 0),
      title:"Lane Swim",
      type:"Activity",
      row:"Main Pool"
  } ,          
  {
      id:6,
      start:new Date(2022, 3, 25, 15, 0, 0, 0),
      end:new Date(2022, 3, 25, 16, 0, 0, 0),
      title:"Lane Swim",
      type:"Activity",
      row:"Main Pool"
  },                   
  // {
  //     id:7,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:8,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:9,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:10,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:11,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:12,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:13,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:14,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:15,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:16,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:17,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:18,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:19,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:20,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:21,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:22,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:23,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:24,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:25,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:26,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:27,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:28,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:29,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:30,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:31,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:32,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:33,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:34,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:35,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:36,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:37,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:38,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:39,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:40,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:41,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:42,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:43,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:44,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:45,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:46,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:47,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:48,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:49,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:50,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:51,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:52,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:53,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:54,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:55,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:56,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:57,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:58,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:59,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:60,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:61,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:62,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:63,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:64,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:65,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // },          
  // {
  //     id:66,
  //     start:new Date(2022, 3, 25, 15, 0, 0, 0),
  //     end:new Date(2022, 3, 25, 16, 0, 0, 0),
  //     title:"Lane Swim",
  //     type:"Activity",
  //     row:"Main Pool"
  // }
]

var days=[
  new Date(2022, 3, 25, 0, 0, 0, 0),
  new Date(2022, 3, 26, 0, 0, 0, 0),
  new Date(2022, 3, 27, 0, 0, 0, 0),
  new Date(2022, 3, 28, 0, 0, 0, 0),
  new Date(2022, 3, 29, 0, 0, 0, 0),
  new Date(2022, 3, 30, 0, 0, 0, 0),
  new Date(2022, 4, 1, 0, 0, 0, 0)
]


var timetable=[
  {
    name:"staff",
    rows:[""]
  },
  {
    name:"Activity",
    rows:[
      "Main Pool",
      "Small Pool",
      "Hydro",
      "Studio Pool",
      "2 Court",
      "4 Court",
    ]
  },
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Schedule days={days} timetables={timetable} events={CalenderData2}/>
      </header>
    </div>
  );
}

export default App;
