import { createRef } from "react";
import lightStyles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
	const searchRef = createRef();
	const selectRef = createRef();
	// const toggleRef = createRef();

	return (
		<div className={lightStyles.searchbBar}>
			<label htmlFor="Search Note"></label>
			<input
				type="search"
				id="Search Note"
				className={lightStyles.searchbBar__input}
				name="q"
				placeholder="Search note&hellip;"
				ref={searchRef}
				onChange={(e) => {
					e.preventDefault();
					onSearch({
						text: e.target.value,
						status: selectRef.current.value,
					});
				}}
				autoComplete="off"
			/>
			<select
				className={lightStyles.searchbBar__btnFilters}
				ref={selectRef}
				onChange={(e) => {
					e.preventDefault();
					onSearch({
						text: searchRef.current.value,
						status: e.target.value,
					});
				}}
			>
				<option
					value="all"
					className={lightStyles.searchbBar__btnFiltersOption}
				>
					All
				</option>
				<option
					value="complete"
					className={lightStyles.searchbBar__btnFiltersOption}
				>
					Complete
				</option>
				<option
					value="incomplete"
					className={lightStyles.searchbBar__btnFiltersOption}
				>
					Incomplete
				</option>
			</select>
		</div>
	);
}
