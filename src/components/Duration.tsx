import React from 'react'
import { ITime } from '../utils/time'

interface IProps {
    time: ITime
}

export const Duration = ({ time } : IProps) => {
  return (
    <>
        {time.days ? time.days.toString() + " d " : ""}
        {time.hours ? time.hours.toString() + " h " : ""}
        {time.minutes.toString() + " min "}
    </>
  )
}
