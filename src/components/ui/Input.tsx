import React, { InputHTMLAttributes, useEffect, useState } from "react";
type SuggestionsType = (string | undefined)[]

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	title: string;
	value?: string | number;
	handler?: (value: string, e?: React.ChangeEvent<HTMLInputElement>) => void;
	// handler?: (value: string | number | undefined) => void;
	children?: React.ReactNode;
	error?: string;
	suggestions?: SuggestionsType;
	classes?: string;
}

export const Input = React.forwardRef(
	(
		{ title, value, handler, children, suggestions = [], error, classes, ...rest }: IProps,
		ref: React.Ref<HTMLInputElement>
	) => {

		const [inputValue, setInputValue] = useState(value);
		const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
		const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

		const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			setInputValue(value);
			handler && handler(value, e);
			if (suggestions) {
				const filteredSuggestions = suggestions
					.filter((suggestion): suggestion is string => typeof suggestion !== 'undefined')
					.filter(suggestion =>
						suggestion.toLowerCase().includes(value.toLowerCase())
					)
					.slice(0, 5)

				setFilteredSuggestions(filteredSuggestions);
			}
			setSelectedSuggestionIndex(-1); // Reset the selected suggestion index when the input changes

		};
		const handleSuggestionClick = (suggestion: string) => {
			handler && handler(suggestion)
			setInputValue(suggestion);
			setFilteredSuggestions([]);
		};
		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (!filteredSuggestions.length && e.key === 'Enter') {

				// TODO
				return;
			}
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				setSelectedSuggestionIndex((prevIndex) => Math.min(prevIndex + 1, filteredSuggestions.length - 1));
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				setSelectedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, -1));
			} else if (e.key === 'Enter' && selectedSuggestionIndex !== -1) {
				e.preventDefault();
				handleSuggestionClick(filteredSuggestions[selectedSuggestionIndex]);
			}
		};

		useEffect(() => {
			setInputValue(value || "")
		}, [value])

		return (
			<>
				{/* <>
				<div className={`autocomplete-container ${filteredSuggestions.length ? "autocomplete-container--open" : ""}`}>
					<label
						className={!error ? "input mb-3 w-full" : "input mb-3 w-full invalid"}
					>
						<input
							placeholder={title}
							value={inputValue || value}
							onChange={(e) => handlerOnChange(e)}
							onKeyDown={handleKeyDown}
							{...rest}
							ref={ref}
						/>
						{children}
					</label>
					{error && <p className="error mb-3 -mt-2">{error}</p>}
					{filteredSuggestions && filteredSuggestions.length > 0 && (
						<ul className="suggestions-list">
							{filteredSuggestions.map((suggestion, index) => (
								<li
									key={index}
									onClick={() => handleSuggestionClick(suggestion)}
									className={index === selectedSuggestionIndex ? 'selected' : ''}
								>

									{suggestion}
								</li>
							))}
						</ul>
					)}
				</div>
			</> */}
				<div className={`form-group ${classes ? classes : "input--rounded input--outline input--lg"}`}>
					<div className="input-wrapper">
						<input
							className={!error ? "input" : "input invalid"}
							placeholder={title}
							value={inputValue || value}
							onChange={(e) => handlerOnChange(e)}
							onKeyDown={handleKeyDown}
							{...rest}
							ref={ref}
						/>
						{children}
					</div>
					{error && <p className="error mt-2">{error}</p>}
				</div>
			</>
		);
	}
);
