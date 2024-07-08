import { useRef } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
	// References for directly access to the DOM elements search input and the select dropdown.
	const searchRef = useRef();
	const selectRef = useRef();

	//* ----------------- JSX ----------------- *//
	return (
		<div className={styles.searchbBar}>
			<label htmlFor="Search Note"></label>
			<input
				type="search"
				className={styles.searchbBar__input}
				name="Search Note"
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
				className={styles.searchbBar__btnFilters}
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
					className={styles.searchbBar__btnFiltersOption}
				>
					All
				</option>
				<option
					value="complete"
					className={styles.searchbBar__btnFiltersOption}
				>
					Complete
				</option>
				<option
					value="incomplete"
					className={styles.searchbBar__btnFiltersOption}
				>
					Incomplete
				</option>
			</select>
		</div>
	);
}
