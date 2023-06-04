import React, { ButtonHTMLAttributes, ReactNode } from "react";
interface Props extends ButtonHTMLAttributes<HTMLAnchorElement> {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children?: React.ReactNode;
  title?: string;
<<<<<<< HEAD
  classes?: string;
}

export const Button = ({ onClick, children, title, classes }: Props) => {
  const handlerOnClick = (e:React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClick && onClick(e)
  }

  return (
    <a href="#" className={classes ? "btn btn--primary radius w-full " + classes : "btn btn--primary radius w-full"} onClick={(e)=> {handlerOnClick(e)}}>
=======
}

export const Button = ({ onClick, children, title }: Props) => {
  const handlerOnClick = (e:React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClick &&  onClick(e)
  }

  return (
    <a href="#" className="btn btn--primary radius w-full" onClick={(e)=> {handlerOnClick(e)}}>
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
      {title ?? children}
    </a>
  );
};
