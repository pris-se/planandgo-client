import React, { ButtonHTMLAttributes, ReactNode } from "react";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  title?: string;
  classes?: string;
}

export const Button = ({ onClick, children, classes, type, ...rest  }: Props) => {
  const handlerOnClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e)
  }

  return (
    <button className={classes ? "btn btn--primary radius w-full " + classes : "btn btn--primary radius w-full"}
      onClick={(e)=> {handlerOnClick(e)}}
      {...rest}
      type={type ? type : "button"}
      >
      {children}
    </button>
  );
};
