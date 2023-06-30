
export const calcDuration = (startTime:string, endTime:string) => {
    const parsedStartTime = Date.parse(startTime)
    const parsedEndTime = Date.parse(endTime)
    
    const result = parsedEndTime - parsedStartTime
    
    return result / 60000
}

export const formatTime = (time:number):string => {
    if(time <= 60) {
        return time.toString() + " min";
    }
    const hours = Math.floor(time / 60)
    
    const minutes = time % 60
    return hours.toString() +  "h " + minutes.toString() + " min";
}