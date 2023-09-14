
export const calcDuration = (startTime:Date, endTime:Date) : number | null => {

    const result = endTime.getTime() - startTime.getTime()
    console.log(result);
    
    
    if(!isNaN(result)) {
        return result
    } else return null
}

export interface ITime {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export const formatTime = (time:number):ITime => {
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const days = Math.floor(time / millisecondsInADay);
    const hours = Math.floor((time % millisecondsInADay) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return  {
        days,
        hours,
        minutes,
        seconds,
    }
}