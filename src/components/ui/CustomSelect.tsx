import Select, { GroupBase } from "react-select"

// interface Option {
// 	[key: string] : string 
// }
interface SelectProps<
	Option = unknown,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>
> {
	value?: string,
	options: {
		[key: string]: string,
	}[],
	// readonly options: readonly Option[];
	onChange: (any: any) => void
}


export const CustomSelect = ({ options, value, ...rest }: SelectProps) => {
	const currentOption = options.find(opt => opt.label === value) || options[0]

	return (
		<Select
			options={options}
			value={currentOption as any}
			{...rest}
			theme={(theme) => ({ ...theme, borderRadius: 0 })}
			components={{
				IndicatorSeparator: () => null
			}}
			className="react-select-container mb-3"
			classNamePrefix="react-select"
			isSearchable={false}
		/>

	)
}
