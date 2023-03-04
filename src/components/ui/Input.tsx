import React, { useState } from 'react'

interface IProps {
  title: string,
  value?: string | number,
  type?: React.HTMLInputTypeAttribute,
  required?: boolean,
  handler: (e: React.FormEvent<HTMLInputElement>) => void
}

export const Input = ({ title, required, type, handler, value }: IProps) => {

  const [inputValue, setInputValue] = useState('')

  const handlerOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    handler(e)
  }

  return (
    <div className='flex flex-col mb-3'>
      <input
        type={type}
        required={required}
        className="input"
        placeholder={title}
        value={value || inputValue}
        onChange={e => handlerOnChange(e)}
      />
    </div>
  )
}
