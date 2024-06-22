import { createRef } from "react";

export default function SearchBar({ onSearch }) {
	const searchRef = createRef();
	const selectRef = createRef();

	return (
		<div>
			<label>
				<input
					type="search"
					className="search"
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
				<span>!!!Insert Img!!!</span>
			</label>
			<label>
				<select
					ref={selectRef}
					onChange={(e) => {
						e.preventDefault();
						onSearch({
							text: searchRef.current.value,
							status: e.target.value,
						});
					}}
				>
					<option value="all">All</option>
					<option value="complete">Complete</option>
					<option value="incomplete">Incomplete</option>
				</select>
			</label>
		</div>
	);
}
