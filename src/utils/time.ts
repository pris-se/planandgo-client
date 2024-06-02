
export const calcDuration = (startTime: Date, endTime: Date): number | null => {

    const result = endTime.getTime() - startTime.getTime()
    console.log(result);


    if (!isNaN(result)) {
        return result
    } else return null
}

export interface ITime {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export const formatTime = (time: number): ITime => {
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const days = Math.floor(time / millisecondsInADay);
    const hours = Math.floor((time % millisecondsInADay) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds,
    }
}

export const compareDatesByDay = (date1: Date, date2: Date) => {
    const date1WithoutTime = new Date(date1);
    date1WithoutTime.setHours(0, 0, 0, 0);

    const date2WithoutTime = new Date(date2);
    date2WithoutTime.setHours(0, 0, 0, 0);

    return date1WithoutTime.getTime() === date2WithoutTime.getTime()
};

export const isDateToday = (date: Date) => {
    return compareDatesByDay(date, new Date())
}