import ScheduleEvent from "../ScheduleEvent";
import { fireEvent, render, screen } from '@testing-library/react';
import ScheduleStyles from '../css/ScheduleEvent.module.css'

var tempData=
{
    id:1,
    start:new Date(2022, 3, 25, 11, 0, 0, 0),
    end:new Date(2022, 3, 25, 12, 0, 0, 0),
    title:"Functional Fit",
    type:"Activity",
    subtext:"additionalData",
    row:"Main Pool"
}

describe('Simple proper render',()=>{
    test('expect key data to be shown',()=>{
    const mockNotLastMoved = jest.fn(()=> -1);
    const clearLastMoved = jest.fn(()=> {});
    render(<ScheduleEvent 
        data={tempData} 
        functions={{
            getLastMoved:mockNotLastMoved,
            clearLastMoved:clearLastMoved
        }} 
        totalRows={1} 
        rowNumber={0}/>)
    
        const title =  screen.getByTestId("time");
        expect(title).toBeInTheDocument();
        const time =  screen.getByText("11:00-12:00");
        expect(time).toBeInTheDocument();
        const subText=  screen.getByText("additionalData");
        expect(subText).toBeInTheDocument();
    })

    test('additional classes are not added',()=>{
        const mockNotLastMoved = jest.fn(()=> -1);
        const clearLastMoved = jest.fn(()=> {});
        const { container } = render(<ScheduleEvent 
            data={tempData} 
            functions={{
                getLastMoved:mockNotLastMoved,
                clearLastMoved:clearLastMoved
            }} 
            totalRows={1} 
            rowNumber={0}/>)            
            expect ((container.firstChild as HTMLDivElement).classList).toContain(ScheduleStyles.item)
            expect ((container.firstChild as HTMLDivElement).classList).not.toContain(ScheduleStyles.hovered)
            expect ((container.firstChild as HTMLDivElement).classList).not.toContain(ScheduleStyles.selected)
            expect ((container.firstChild as HTMLDivElement).classList).not.toContain(ScheduleStyles.dragging)

            expect(mockNotLastMoved).toBeCalled();
            expect(clearLastMoved).not.toBeCalled();
        })


    test('additional classes are added',()=>{
        const mockLastMoved = jest.fn(()=> 1)
        const clearLastMoved = jest.fn(()=> {});
        const { container } = render(<ScheduleEvent 
            data={tempData} 
            functions={{
                getLastMoved:mockLastMoved,
                clearLastMoved:clearLastMoved
            }} 
            totalRows={1} 
            rowNumber={0}/>)   
    
            expect(mockLastMoved).toBeCalled();
            expect(clearLastMoved).toBeCalled();

            expect ((container.firstChild as HTMLDivElement).classList).toContain(ScheduleStyles.item)
            expect ((container.firstChild as HTMLDivElement).classList).not.toContain(ScheduleStyles.hovered)
            expect ((container.firstChild as HTMLDivElement).classList).toContain(ScheduleStyles.selected)
            expect ((container.firstChild as HTMLDivElement).classList).toContain(ScheduleStyles.dragging)
        })

    test('added hover style on mouseover',()=>{
        const mockNotLastMoved = jest.fn(()=> -1);
        const clearLastMoved = jest.fn(()=> {});
        const clearOffsets = jest.fn(()=> {});
        const { container } = render(<ScheduleEvent 
            data={tempData} 
            functions={{
                getLastMoved:mockNotLastMoved,
                clearLastMoved:clearLastMoved,
                clearOffsets:clearOffsets
            }} 
            totalRows={1} 
            rowNumber={0}/>);
        fireEvent.mouseMove((container.firstChild as Element));
        expect ((container.firstChild as HTMLDivElement).classList).toContain(ScheduleStyles.hovered)

        fireEvent.mouseLeave((container.firstChild as Element));
        expect ((container.firstChild as HTMLDivElement).classList).not.toContain(ScheduleStyles.hovered)
    });


})