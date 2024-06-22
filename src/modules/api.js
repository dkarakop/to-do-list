export const getToDoItems = () => {
	return fetch(`http://localhost:3001/toDos`).then((response) =>
		response.json()
	);
};

export function createToDoItem(text) {
	const newId = Date.now();

	return fetch("http://localhost:3001/toDos", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: newId, text, completed: false }),
	}).then((response) => response.json());
}

export async function deleteToDoItem(id) {
	await fetch(`http://localhost:3001/toDos/${id}`, {
		method: "DELETE",
	});
	return getToDoItems();
}

export const searchItems = (text) => {
	return fetch(`http://localhost:3001/toDos/${text}`)
		.then((response) => response.json())
		.then((data) => data.filter(data.text === text));
};
