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
  }

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
