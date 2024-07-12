import React, { ButtonHTMLAttributes } from "react";
import { Spinner } from "./Spinner";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	children?: React.ReactNode;
	title?: string;
	classes?: string;
	isLoading?: boolean;
}

export const Button = ({ onClick, children, classes, type, isLoading, ...rest }: Props) => {
	const handlerOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		onClick && onClick(e)
	}

	return (
		<button
			className={classes ? "btn rounded" + " " + classes : "btn btn--primary rounded w-full btn--lg"}
			onClick={(e) => { handlerOnClick(e) }}
			{...rest}
			type={type ? type : "button"}
			disabled={isLoading}
		>
			{
				!isLoading ?
					children
					:
					<Spinner />
			}
		</button>
	);
};
