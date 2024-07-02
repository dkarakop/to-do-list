import lightStyles from "./ToDoApp.module.css";

export default function ToDoListItem({ toDo, onEdit, onDelete, onChecked }) {
	return (
		<li key={toDo.id} className={lightStyles.toDolist__li}>
			<button
				className={
					lightStyles.toDolist__checkbox +
					" " +
					(toDo.completed
						? lightStyles["toDolist__checkbox--checked"]
						: "")
				}
				onClick={(e) => {
					e.preventDefault();
					onChecked(toDo);
				}}
			></button>
			<p
				className={
					lightStyles.toDolist__text +
					" " +
					(toDo.completed
						? lightStyles["toDolist__text--checked"]
						: "")
				}
			>
				{toDo.text}
			</p>
			<div className={lightStyles.toDoList__btnContainer}>
				<button
					className={
						lightStyles.toDolist__btnEdit +
						" " +
						lightStyles.toDolist__buttons
					}
					onClick={(e) => {
						e.preventDefault();
						onEdit(toDo);
					}}
				></button>
				<button
					className={
						lightStyles.toDolist__btnDelete +
						" " +
						lightStyles.toDolist__buttons
					}
					onClick={(e) => {
						e.preventDefault();
						onDelete(toDo);
					}}
				></button>
			</div>
		</li>
	);
}
