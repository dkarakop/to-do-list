import { useEffect, useReducer } from "react";
import { createToDoItem, getToDoItems, deleteToDoItem } from "../modules/api";
import ToDoListItem from "./ToDoListItem";
import SearchBar from "./SearchBar";
import ModalWindow from "./ModalWindow";

export default function ToDoApp() {
	function toDosReducer(state, action) {
		const newState = {
			toDos: state.toDos,
			filteredToDos: state.filteredToDos,
			filters: state.filters,
		};
		switch (action.type) {
			case "UPDATE_TODOS":
				newState.toDos = action.toDos;
				break;
			case "UPDATE_FILTERED_TODOS":
				newState.filteredToDos = action.toDos;
				break;
			case "UPDATE_FILTERS":
				newState.filters = action.filters;
				break;
			default:
				break;
		}
		return newState;
	}

	let initialState = {
		toDos: [],
		filteredToDos: [],
		filters: {
			text: "",
			status: "all",
		},
	};

	const [state, dispatch] = useReducer(toDosReducer, initialState);

	useEffect(() => {
		getToDoItems().then((toDos) => {
			dispatch({ type: "UPDATE_TODOS", toDos });
		});
	}, []);

	useEffect(() => {
		let updatedList = [];

		if (state.filters.text !== "") {
			updatedList = state.toDos.filter(
				(toDo) =>
					toDo.text
						.toLowerCase()
						.substring(0, state.filters.text.length) ===
					state.filters.text.toLowerCase()
			);
		} else {
			updatedList = state.toDos;
		}

		updatedList = updatedList.filter((toDo) => {
			switch (state.filters.status) {
				case "complete":
					return toDo.completed === true;
				case "incomplete":
					return toDo.completed === false;
				default:
					return true;
			}
		});

		dispatch({ type: "UPDATE_FILTERED_TODOS", toDos: updatedList });
	}, [state.toDos, state.filters]);

	function onSearch(filters) {
		dispatch({ type: "UPDATE_FILTERS", filters });
	}

	function onApply(text) {
		createToDoItem(text).then(() => {
			getToDoItems().then((toDos) => {
				dispatch({ type: "UPDATE_TODOS", toDos });
			});
		});
	}

	function onEdit(toDo) {
		console.log("EDIT", toDo);
	}

	function onDelete(toDo) {
		deleteToDoItem(toDo.id).then(() => {
			getToDoItems().then((toDos) => {
				dispatch({ type: "UPDATE_TODOS", toDos });
			});
		});
	}

	return (
		<div>
			<h1>TODO LIST</h1>
			<SearchBar onSearch={onSearch} />
			<ul>
				{state.filteredToDos.map((toDo) =>
					ToDoListItem({ toDo, onEdit, onDelete })
				)}
			</ul>
			<ModalWindow onApply={onApply} />
		</div>
	);
}
