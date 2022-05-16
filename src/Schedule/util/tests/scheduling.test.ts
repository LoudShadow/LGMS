import {intervalPartitioning,MaxHeightScheduling,MaxHeightResult} from '../scheduling';
import {ScheduleItem} from '../../Core/Schedule';




const data1:ScheduleItem[]=[
    {
        id:1,row:"",type:"",title:"",
        start:new Date(0,0,0,1,0,0),
        end:new Date(0,0,0,2,0,0)
    },
    {
        id:2,row:"",type:"",title:"",
        start:new Date(0,0,0,1,15,0),
        end:new Date(0,0,0,2,15,0)
    },
    {
        id:3,row:"",type:"",title:"",
        start:new Date(0,0,0,1,30,0),
        end:new Date(0,0,0,2,30,0)
    },
    {
        id:4,row:"",type:"",title:"",
        start:new Date(0,0,0,1,45,0),
        end:new Date(0,0,0,2,45,0)
    },
    {
        id:5,row:"",type:"",title:"",
        start:new Date(0,0,0,2,0,0),
        end:new Date(0,0,0,3,0,0)
    },
    {
        id:6,row:"",type:"",title:"",
        start:new Date(0,0,0,2,15,0),
        end:new Date(0,0,0,3,15,0)
    },
    {
        id:7,row:"",type:"",title:"",
        start:new Date(0,0,0,2,30,0),
        end:new Date(0,0,0,3,30,0)
    },
    {
        id:8,row:"",type:"",title:"",
        start:new Date(0,0,0,2,45,0),
        end:new Date(0,0,0,3,45,0)
    },
    {
        id:9,row:"",type:"",title:"",
        start:new Date(0,0,0,3,0,0),
        end:new Date(0,0,0,4,0,0)
    },
    {
        id:10,row:"",type:"",title:"",
        start:new Date(0,0,0,3,15,0),
        end:new Date(0,0,0,4,15,0)
    },
    {
        id:11,row:"",type:"",title:"",
        start:new Date(0,0,0,3,30,0),
        end:new Date(0,0,0,4,30,0)
    },
    {
        id:12,row:"",type:"",title:"",
        start:new Date(0,0,0,3,45,0),
        end:new Date(0,0,0,4,45,0)
    },
    {
        id:13,row:"",type:"",title:"",
        start:new Date(0,0,0,4,0,0),
        end:new Date(0,0,0,5,0,0)
    },
    {
        id:14,row:"",type:"",title:"",
        start:new Date(0,0,0,4,15,0),
        end:new Date(0,0,0,5,15,0)
    },
    {
        id:15,row:"",type:"",title:"",
        start:new Date(0,0,0,4,30,0),
        end:new Date(0,0,0,5,30,0)
    },
    {
        id:16,row:"",type:"",title:"",
        start:new Date(0,0,0,4,45,0),
        end:new Date(0,0,0,5,45,0)
    },
]

function selectIDs(selected:number[]){
    var returnValues=[];
    for (const iterator of selected) {
        for (const item of data1) {
            if (item.id==iterator){
                returnValues.push(item);
            }
        }
    }
    return returnValues;
}

function checkOrder(items:ScheduleItem[][],expected:number[][]){
    var reduced = items.map(i=> i.map(j=>j.id));
    expect(reduced).toEqual(expected);
}

describe('interval scheduling',()=>{
    test('expect to work on basic non overlapping items',()=>{
        const data = selectIDs([1,5,9,13])
        const result=intervalPartitioning(data);
        const expected=[[1,5,9,13]];
        checkOrder(result,expected);
    })
    test('expect result to be in order',()=>{
        const data = selectIDs([13,5,9,1])
        const result=intervalPartitioning(data);
        const expected=[[1,5,9,13]];        
        checkOrder(result,expected);
    })
    test('expect new list for overlapping',()=>{
        const data = selectIDs([13,5,9,1,2,3])
        const result=intervalPartitioning(data);
        const expected=[[1,5,9,13],[2],[3]];        
        checkOrder(result,expected);
    })
    test('complex one',()=>{
        const data = selectIDs([3,7,1,11,8,5,2])
        const result=intervalPartitioning(data);
        const expected=[[1,5,11],[2,7],[3,8]];        
        checkOrder(result,expected);
    })
})


//MaxHeightScheduling

// This takes an array of events and returns a strucutes array
//
//
//{
//  item:original event
//  rowCount: number of rows at the time
//  row : location in the row
//}

function checkContnets(result:MaxHeightResult[],expected:{id:number,row:number,rowCount:number}[]){
    var compare = result.map(x=> {return {id:x.event.id,row:x.row,rowCount:x.rowCount}});
    expect(compare).toEqual(expected);
}

describe('MaxHeightScheduling',()=>{
    test('expect to work on basic non overlapping items',()=>{
        const data = selectIDs([1,5,9,13])
        const result=MaxHeightScheduling(data);
        const expected=[
            {id:1,row:0,rowCount:1},
            {id:5,row:0,rowCount:1},
            {id:9,row:0,rowCount:1},
            {id:13,row:0,rowCount:1},
        ];
        checkContnets(result,expected);
    });
    test('expect to work on out of order non overlapping items',()=>{
        const data = selectIDs([13,9,1,5])
        const result=MaxHeightScheduling(data);
        const expected=[
            {id:1,row:0,rowCount:1},
            {id:5,row:0,rowCount:1},
            {id:9,row:0,rowCount:1},
            {id:13,row:0,rowCount:1},
        ];
        checkContnets(result,expected);
    });
    test('expect to work on single overlapping items',()=>{
        const data = selectIDs([1,2,9,13])
        const result=MaxHeightScheduling(data);
        result.sort((a,b)=> a.event.id-b.event.id)
        const expected=[
            {id:1,row:0,rowCount:2},
            {id:2,row:1,rowCount:2},
            {id:9,row:0,rowCount:1},
            {id:13,row:0,rowCount:1},
        ];
        checkContnets(result,expected);
    });
    test('expect to work on multiple overlapping items',()=>{
        const data = selectIDs([1,2,5,9,13])
        const result=MaxHeightScheduling(data);
        result.sort((a,b)=> a.event.id-b.event.id)
        const expected=[
            {id:1,row:0,rowCount:2},
            {id:2,row:1,rowCount:2},
            {id:5,row:0,rowCount:2},
            {id:9,row:0,rowCount:1},
            {id:13,row:0,rowCount:1},
        ];
        checkContnets(result,expected);
    });
})