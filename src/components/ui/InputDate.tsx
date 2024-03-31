import React, { useState } from 'react'
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps extends Omit<ReactDatePickerProps, 'value'> {
	title: string,
	value?: Date | null,
	startDate?: Date | null,
	minDate?: Date | null,
	minTime?: Date,
	maxTime?: Date
	handler?: (arg: any) => void
	name?: string,
	inline?: boolean
}

export const InputDate = ({ title, value = null, handler, ...rest }: DatePickerProps) => {
	// const [startDate, setStartDate] = useState<Date | null>(value);

	// const handlerChange = (date: React.SetStateAction<Date | null>) => {
	// 	setStartDate(date)
	// 	if (handler && date) {
	// 		handler(date)
	// 	}
	// }

	return (
		<div className="form-group input--rounded input--outline input--lg">
			<DatePicker
				calendarClassName='datepicker'
				placeholderText={title}
				selected={value}
				timeFormat="HH:mm"
				timeIntervals={5}
				timeCaption="time"
				dateFormat="dd MMM yy, h:mm aa"
				autoComplete="off"
				{...rest}
			// onChange={handlerChange}

			/>
		</div>
	);
}
