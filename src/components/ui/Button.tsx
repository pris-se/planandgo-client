import React, { ButtonHTMLAttributes, ReactNode } from "react";
interface Props extends ButtonHTMLAttributes<HTMLAnchorElement> {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children?: React.ReactNode;
  title?: string;
  classes?: string;
}

export const Button = ({ onClick, children, title, classes }: Props) => {
  const handlerOnClick = (e:React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClick && onClick(e)
  }

  return (
    <a href="#" className={classes ? "btn btn--primary radius w-full " + classes : "btn btn--primary radius w-full"} onClick={(e)=> {handlerOnClick(e)}}>
      {title ?? children}
    </a>
  );
};
