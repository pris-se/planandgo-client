import React, { useEffect, useState } from "react";

import { ReactComponent as ThemeLightIcon } from "../../assets/img/theme-light.svg";
import { ReactComponent as ThemeDarkIcon } from "../../assets/img/theme-dark.svg";
import { isDarkMode, setDarkMode } from "../../redux/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";


export const ThemeSwitch = () => {
	const dispatch = useAppDispatch();

	const isDark = useAppSelector(isDarkMode);

	const changeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setDarkMode(e.target.checked));
	};

	return (
		<div className="flex items-center gap-2 justify-between">
			<label className="switch switch--theme">
				<input
					type="checkbox"
					checked={isDark}
					onChange={(e) => changeTheme(e)}
				/>
				<div className="slider">
					<span className="switch-value">
						<span className="ico">
							<ThemeLightIcon />
						</span>
					</span>
					<span className="switch-value">
						<span className="ico">
							<ThemeDarkIcon />
						</span>
					</span>
				</div>
			</label>
		</div>

	)
		;
};

