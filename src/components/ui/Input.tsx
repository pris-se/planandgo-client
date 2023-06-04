import React, { ReactEventHandler, useState } from 'react'

interface IProps {
  title: string,
  value?: string | number,
  type?: React.HTMLInputTypeAttribute,
  required?: boolean,
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ title, required, type, handler, value }: IProps) => {

  const [inputValue, setInputValue] = useState("")

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    
    handler(e)
    
  }

  return (
    <div className='flex flex-col mb-3 w-full'>
      <input
        type={type}
        required={required}
        className="input"
        placeholder={title}
        value={inputValue || value}
        onChange={e => handlerOnChange(e)}
      />
    </div>
  )
}
