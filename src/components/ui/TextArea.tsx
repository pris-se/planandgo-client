import React, { TextareaHTMLAttributes, useEffect, useState } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	title: string;
	value?: string | number;
	handler?: (value: string, e?: React.ChangeEvent<HTMLTextAreaElement>) => void;
	children?: React.ReactNode;
	error?: string;
	classes?: string;
}

export const TextArea = React.forwardRef(
	(
		{ title, value, handler, children, error, classes, ...rest }: IProps,
		ref: React.Ref<HTMLTextAreaElement>
	) => {

		const [inputValue, setInputValue] = useState(value);

		const handlerOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const value = e.target.value
			setInputValue(value);
			handler && handler(value, e);
		};
		useEffect(() => {
			setInputValue(value || "")
		}, [value])

		return (
			<>
				<div className={`form-group ${classes ? classes : "input--rounded input--outline input--lg"}`}>
					<div className="input-wrapper">
						<textarea
							className={!error ? "textarea" : "textarea invalid"}
							placeholder={title}
							value={inputValue || value}
							onChange={(e) => handlerOnChange(e)}
							{...rest}
							ref={ref}
						/>
						{children}
					</div>
					{error && <p className="error mt-2">{error}</p>}
				</div>
			</>
		);
	}
);
