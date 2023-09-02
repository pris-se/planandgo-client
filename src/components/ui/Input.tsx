import React, { InputHTMLAttributes, ReactEventHandler, useState } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
  title: string,
  value?: string | number,
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode;
}

export const Input = ({ title, value, handler, children, ...rest }: IProps) => {

  const [inputValue, setInputValue] = useState("")

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    handler(e)
  }

  return (
    <label className='input mb-3 w-full'>
      <input
        placeholder={title}
        value={inputValue || value}
        onChange={e => handlerOnChange(e)}
        {...rest}
      />
      {children}
    </label>
  )
}
