import { useEffect, useState } from "react";
import Select, { GroupProps, PlaceholderProps, Props, PropsValue, SingleValue, components } from "react-select"

interface Option {
	label: string;
	value: string | number;
}

interface SelectProps extends Props<Option, false> {
	selectValue?: string | number | null | undefined;
	options: Option[];
	// defaultValue?: PropsValue<Option>;
	onSelect?: (option: Option | null) => void
}

const Placeholder = (props: PlaceholderProps<Option>) => {
	return <components.Placeholder {...props} />;
};

export const SelectBox = ({ options, selectValue, onSelect, isMulti = false, ...rest }: SelectProps) => {

	const [value, setValue] = useState(findValue(selectValue));

	function findValue(value: string | number | undefined | null) {
		return options.find((option) => option.value === value) || null;
	}
	function handleOnChange(option: SingleValue<Option>) {
		onSelect && onSelect(option)
		setValue(option);
	}

	useEffect(() => {
		setValue(findValue(selectValue))
	}, [selectValue])

	return (
		<div className="form-group">
			<Select
				options={options}
				value={value}
				theme={(theme) => ({ ...theme, borderRadius: 0 })}
				components={{
					IndicatorSeparator: () => null,
					Placeholder
				}}
				className="react-select-container"
				classNamePrefix="react-select"
				isSearchable={false}
				menuPortalTarget={document.body}
				menuPosition="absolute"
				{...rest}
				onChange={handleOnChange}
			/>
		</div>

	)
}
