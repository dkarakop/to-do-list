import { createRef } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
	const searchRef = createRef();
	const selectRef = createRef();

	return (
		<div className={styles.searchbBar}>
			<input
				type="search"
				className={styles.searchbBar__input}
				name="q"
				placeholder="Search note..."
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
			<button className={styles.btnDarkMode}></button>
		</div>
	);
}
