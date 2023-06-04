<<<<<<< HEAD
import React, { ReactEventHandler, useState } from 'react'
=======
import React, { useState } from 'react'
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc

interface IProps {
  title: string,
  value?: string | number,
  type?: React.HTMLInputTypeAttribute,
  required?: boolean,
<<<<<<< HEAD
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void
=======
  handler: (e: React.FormEvent<HTMLInputElement>) => void
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
}

export const Input = ({ title, required, type, handler, value }: IProps) => {

<<<<<<< HEAD
  const [inputValue, setInputValue] = useState("")

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    
    handler(e)
    
  }

  return (
    <div className='flex flex-col mb-3 w-full'>
=======
  const [inputValue, setInputValue] = useState('')

  const handlerOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    handler(e)
  }

  return (
    <div className='flex flex-col mb-3'>
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
      <input
        type={type}
        required={required}
        className="input"
        placeholder={title}
<<<<<<< HEAD
        value={inputValue || value}
=======
        value={value || inputValue}
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
        onChange={e => handlerOnChange(e)}
      />
    </div>
  )
}
