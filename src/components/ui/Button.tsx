import React, { ButtonHTMLAttributes, ReactNode } from "react";
interface Props extends ButtonHTMLAttributes<HTMLAnchorElement> {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children?: React.ReactNode;
  title?: string;
}

export const Button = ({ onClick, children, title }: Props) => {
  const handlerOnClick = (e:React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClick &&  onClick(e)
  }

  return (
    <a href="#" className="btn btn--primary radius w-full" onClick={(e)=> {handlerOnClick(e)}}>
      {title ?? children}
    </a>
  );
};
