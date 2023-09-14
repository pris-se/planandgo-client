import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  title: string,
  value?: Date | null,
  startDate?: Date | null,
  minDate?: Date | null,
  minTime?: Date,
  maxTime?: Date
  handler?: (arg: any) => void
  name?: string,
}

export const InputDate = ({ title, value = null, handler, ...rest } : IProps) => {
    const [startDate, setStartDate] = useState<Date | null>(value);

    const changeHanler = (date: React.SetStateAction<Date | null>) => {
      setStartDate(date)
      if(handler && date) {
        handler(date)
      }
    }

    return (
    <label className='input mb-3 w-full'>
      <DatePicker
        placeholderText={title}
        selected={startDate}
        onChange={changeHanler}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={5}
        timeCaption="time"
        dateFormat="dd MMM yy, h:mm aa"
        autoComplete="off"
        {...rest}
      />
      </label>
    );
}
