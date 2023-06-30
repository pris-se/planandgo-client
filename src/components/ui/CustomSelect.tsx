import React, { useState } from 'react'
import StateManagedSelect, { GroupBase } from 'react-select'
import Select  from "react-select"

interface SelectProps<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> {
  options: {
    [key: string]: string,
  }[],
  onChange: (any: any) => void
}


export const CustomSelect = ({ options, ...rest } : SelectProps) => {
  const [option, setOption] = useState<any>()

  return (
    <Select options={options} {...rest} theme={(theme) => ({ ...theme, borderRadius: 0 })}
    className="react-select-container mb-3"
    classNamePrefix="react-select"
    // value={option}
    // onChange={option => setOption(option)}
    />

  )
}
