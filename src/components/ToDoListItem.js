import styles from "./ToDoApp.module.css";

export default function ToDoListItem({ toDo, onEdit, onDelete }) {
	return (
		<li key={toDo.id} className={styles.toDolist__li}>
			<button
				className={
					styles.toDolist__checkbox +
					" " +
					`styles.toDolist__checkbox--completed`
				}
			></button>
			<p
				className={
					styles.toDolist__text +
					" " +
					`styles.toDolist__text--completed`
				}
			>
				{toDo.text}
			</p>
			<div className={styles.toDoList__btnContainer}>
				<button
					className={
						styles.toDolist__btnEdit +
						" " +
						styles.toDolist__buttons
					}
					onClick={(e) => {
						e.preventDefault();
						onEdit(toDo);
					}}
				></button>
				<button
					className={
						styles.toDolist__btnDelete +
						" " +
						styles.toDolist__buttons
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
