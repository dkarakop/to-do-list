// Retrieve the API URL from the environment variables
const apiUrl = process.env.REACT_APP_API_URL;

/**
 * Getting the "toDos" array from our database.
 * @param none
 * @returns a Promise
 */
export const getToDoItems = () => {
	return fetch(`${apiUrl}/toDos`).then((response) => response.json());
};

/**
 * Adding a newly created toDo object to the 'toDos' array in our database. The new object's properties are: id: a new unique id, text: the provided text, completed: false.
 * @param text
 * @returns a Promise
 */
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

/**
 * Removing a specific toDo object from the 'toDos' array in our database based on its id.
 * @param id
 * @returns a Promise
 */
export function deleteToDoItem(id) {
	return fetch(`${apiUrl}/toDos/${id}`, {
		method: "DELETE",
	});
}

/**
 * Updating the existing toDo object based on its id from the 'toDos' array in our database.
 * @param toDo
 * @returns a Promise
 */
export function editToDoItem(toDo) {
	return fetch(`${apiUrl}/toDos/${toDo.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(toDo),
	}).then((response) => response.json());
}
