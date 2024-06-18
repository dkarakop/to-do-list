import { useState, useEffect } from "react";

export default function ToDoApp() {
	const [toDos, setToDos] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3001/toDos")
			.then((response) => response.json())
			.then((data) => setToDos(data));
	}, []);

	return (
		<div>
			<h1>To-Do List</h1>
			<ul>
				{toDos.map((toDo) => (
					<li key={toDo.id}>
						{toDo.text}{" "}
						{toDo.completed ? "(Completed)" : "(Incompleted)"}
					</li>
				))}
			</ul>
		</div>
	);
}
