import React, { InputHTMLAttributes, ReactEventHandler, useState } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
  title: string,
  value?: string | number,
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ title, value, handler, ...rest }: IProps) => {

  const [inputValue, setInputValue] = useState("")

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    handler(e)
  }

  return (
    <label className='flex flex-col mb-3 w-full'>
      <input
        className="input"
        placeholder={title}
        value={inputValue || value}
        onChange={e => handlerOnChange(e)}
        {...rest}
      />
    </label>
  )
}
