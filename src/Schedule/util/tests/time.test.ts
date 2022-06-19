import {timeToString,floorTime,SameDay,Overlap, TimeAtstart} from '../time';

describe('timeToString',()=>{
    test ('time to string converts time correctly',()=>{
        expect(timeToString(0)).toBe("00:00");
        expect(timeToString(60)).toBe("01:00");
        expect(timeToString(120)).toBe("02:00");
        expect(timeToString(88)).toBe("01:28");
        expect(timeToString(1)).toBe("00:01");
    });
    test ('time to string handles invalid times',()=>{
        expect(()=>{timeToString(NaN)}).toThrow();
        expect(()=>{timeToString(-1)}).toThrow();
    });
});

describe('SameDay',()=>{
    test ('same day matches on identical days',()=>{
        const day1 = new Date(2022,2,12,5,32,51);
        const day2 = new Date(2022,2,12,8,34,23);
        expect(SameDay(day1,day2)).toBe(true);
    });
    test ('same day does not match on different days',()=>{
        const day1 = new Date(2022,2,12,5,32,51);
        const day2 = new Date(2022,2,14,8,34,23);
        expect(SameDay(day1,day2)).toBe(false);
    });
    test ('same day does not match on different month',()=>{
        const day1 = new Date(2022,2,12,5,32,51);
        const day2 = new Date(2022,3,12,8,34,23);
        expect(SameDay(day1,day2)).toBe(false);
    });
    test ('same day does not match on different year',()=>{
        const day1 = new Date(2022,2,12,5,32,51);
        const day2 = new Date(2021,2,12,8,34,23);
        expect(SameDay(day1,day2)).toBe(false);
    });
});

describe('roundTime',()=>{
    var date= new Date(0,0,0,15,23,0);
    test ('works in a simple way',()=>{
        expect(floorTime(date,2)).toEqual(new Date(0,0,0,15,22,0))
        expect(floorTime(date,5)).toEqual(new Date(0,0,0,15,20,0))
    })
    test ('works to the hour',()=>{
        expect(floorTime(date,30)).toEqual(new Date(0,0,0,15,0,0))
        expect(floorTime(date,60)).toEqual(new Date(0,0,0,15,0,0))
    })
    test ('works beyond the hour',()=>{
        expect(floorTime(date,120)).toEqual(new Date(0,0,0,14,0,0))
    })
})

describe('overlap',()=>{
    test ('works on non overlapping times',()=>{
        const start1= new Date(0,0,0,1,0,0);
        const end1= new Date(0,0,0,2,0,0);
        const start2= new Date(0,0,0,3,0,0);
        const end2= new Date(0,0,0,4,0,0);
        expect(Overlap(start1,end1,start2,end2)).toBeFalsy();
    })
    test ('works on touching times',()=>{
        const start1= new Date(0,0,0,1,0,0);
        const end1= new Date(0,0,0,2,0,0);
        const start2= new Date(0,0,0,2,0,0);
        const end2= new Date(0,0,0,3,0,0);
        expect(Overlap(start1,end1,start2,end2)).toBeFalsy();
    })
    test ('works on overlapping items',()=>{
        const start1= new Date(0,0,0,1,0,0);
        const end1= new Date(0,0,0,2,0,0);
        const start2= new Date(0,0,0,1,30,0);
        const end2= new Date(0,0,0,2,30,0);
        expect(Overlap(start1,end1,start2,end2)).toBeTruthy();
    })
    test ('works on identical items',()=>{
        const start1= new Date(0,0,0,1,0,0);
        const end1= new Date(0,0,0,2,0,0);
        const start2= new Date(0,0,0,1,0,0);
        const end2= new Date(0,0,0,2,0,0);
        expect(Overlap(start1,end1,start2,end2)).toBeTruthy();
    })
})

describe('Time at start',()=>{
    test('Works on start anyway',()=>{
        const start= new Date(2022,2,4,0,0,0);
        expect(TimeAtstart(start)).toEqual(start);
    })
    test('Works on start anyway',()=>{
        const start= new Date(2022,2,4,0,6,0);
        const expected= new Date(2022,2,4,0,0,0);
        expect(TimeAtstart(start)).toEqual(expected);
    })

})