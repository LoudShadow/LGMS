import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import CSS from 'csstype';
import CalenderItem from '../CalenderItem';

import {ActivityClass} from '../Calender';
import styles from './styles.module.css';
import { intervalPartitioning } from '../Helpers/scheduling';
import { useEffect, useState } from 'react';


interface rowProps{
    name:string;
    startOffset:number;
    style?: CSS.Properties;
    data?:ActivityClass[];
    children: React.ReactNode | React.ReactNode[];
    rowHeight:number;
    minwidth:number;
    editData:any;

    searchFunctions?:any;

}

function Row(props:rowProps){
    const [activities,setActivities]= useState(props.data);
    useEffect(
        ()=>{
            setActivities(props.data)
        }
        ,[props]
    )
    if (activities===undefined){return(<></>)}
    var partitioned=intervalPartitioning(activities);

    activities.sort(x=> x.start.getTime());

    const updateTimeHoriz=(id:number,start:Date,duration:number)=>{        
        setActivities(
            activities.map(x=>x.id===id?
                {...x, start:start , duration:duration}
                :
                x
                )
        )
    }



    var newProps:React.ReactNode[]=[];
    partitioned.forEach((row,index)=>{
        row.forEach((x,i)=>{
            newProps.push(
                <CalenderItem {...x} 
                    key={x.id} 
                    style={{
                        top: ((100/partitioned.length)*index)+'%',
                        bottom:(100-(100/partitioned.length)*(index+1))+'%'
                    }}
                    increment={props.minwidth}
                    rowHeight={props.rowHeight}
                    startOffset={props.startOffset}
                    searchFunctions={props.searchFunctions}
                    updateLight={{H:updateTimeHoriz}}
                    editData={props.editData}
                    />
            )
        })
    })
    return(
        <Box className={styles.Row}>
            <Box className={styles.RowTitle}>
                <Typography 
                    variant="h6" 
                    color="initial"
                    >{props.name}
                </Typography>
            </Box>
            {newProps}
        </Box>
    )
}

export default Row;