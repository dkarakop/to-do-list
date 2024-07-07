import styles from "./ToDoApp.module.css";

export default function ToDoListItem({ toDo, onEdit, onDelete, onChecked }) {
	return (
		<li className={styles.toDoList__li}>
			<button
				className={
					styles.toDoList__checkbox +
					" " +
					(toDo.completed
						? styles["toDoList__checkbox--checked"]
						: "")
				}
				onClick={(e) => {
					e.preventDefault();
					onChecked(toDo);
				}}
			></button>
			<div
				className={
					styles.toDoList__text +
					" " +
					(toDo.completed ? styles["toDoList__text--checked"] : "")
				}
			>
				{toDo.text}
			</div>
			<div className={styles.toDoList__btnContainer}>
				<button
					className={
						styles.toDoList__btnEdit +
						" " +
						styles.toDoList__buttons
					}
					onClick={(e) => {
						e.preventDefault();
						onEdit(toDo);
					}}
				></button>
				<button
					className={
						styles.toDoList__btnDelete +
						" " +
						styles.toDoList__buttons
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
