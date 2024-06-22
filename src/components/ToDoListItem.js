export default function ToDoListItem({ toDo, onEdit, onDelete }) {
	return (
		<li key={toDo.id}>
			<label>
				<input type="checkbox" />
				{toDo.text}
			</label>
			<button
				className="edit-btn"
				onClick={(e) => {
					e.preventDefault();
					onEdit(toDo);
				}}
			>
				Edit
			</button>
			<button
				className="delete-btn"
				onClick={(e) => {
					e.preventDefault();
					onDelete(toDo);
				}}
			>
				Delete
			</button>
		</li>
	);
}
