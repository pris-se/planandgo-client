import React, { InputHTMLAttributes, useEffect, useState } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  value?: string | number;
  handler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef(
  (
    { title, value, handler, children, error, ...rest }: IProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [inputValue, setInputValue] = useState(value);

    const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      handler && handler(e);
    };

    useEffect(() => {
      setInputValue(value || "")
    }, [value])

    return (
      <>
        <label
          className={!error ? "input mb-3 w-full" : "input mb-3 w-full invalid"}
        >
          <input
            placeholder={title}
            value={inputValue || value}
            onChange={(e) => handlerOnChange(e)}
            {...rest}
            ref={ref}
          />
          {children}
        </label>
        {error && <p className="error mb-3 -mt-2">{error}</p>}
      </>
    );
  }
);
