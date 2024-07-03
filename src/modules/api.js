const apiUrl = process.env.REACT_APP_API_URL;

export const getToDoItems = () => {
	return fetch(`${apiUrl}/toDos`).then((response) => response.json());
};

export function createToDoItem(text) {
	const newId = String(Date.now());

	return fetch(`${apiUrl}/toDos`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: newId, text, completed: false }),
	}).then((response) => response.json());
}

export function deleteToDoItem(id) {
	return fetch(`${apiUrl}/toDos/${id}`, {
		method: "DELETE",
	});
}

export function editToDoItem(toDo) {
	return fetch(`${apiUrl}/toDos/${toDo.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(toDo),
	}).then((response) => response.json());
}
