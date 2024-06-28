import { useEffect, useReducer } from "react";
import {
	createToDoItem,
	getToDoItems,
	deleteToDoItem,
	editToDoItem,
} from "../modules/api";
import ToDoListItem from "./ToDoListItem";
import SearchBar from "./SearchBar";
import ModalWindow from "./Modal";
import styles from "./ToDoApp.module.css";

export default function ToDoApp() {
	let initialState = {
		toDos: [],
		filteredToDos: [],
		filters: {
			text: "",
			status: "all",
		},
		isModalOpen: false,
		selectedToDo: null,
	};

	function toDosReducer(state, action) {
		const newState = {
			toDos: state.toDos,
			filteredToDos: state.filteredToDos,
			filters: state.filters,
			isModalOpen: state.isModalOpen,
			selectedToDo: state.selectedToDo,
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
			case "CREATE_TODO":
				newState.selectedToDo = null;
				newState.isModalOpen = true;
				break;
			case "EDIT_TODO":
				newState.selectedToDo = action.toDo;
				newState.isModalOpen = true;
				break;
			case "CLOSE_MODAL":
				newState.isModalOpen = false;
				break;
			default:
				break;
		}
		return newState;
	}

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

	function onApply(toDo) {
		if (toDo.id) {
			editToDoItem(toDo).then(() => {
				getToDoItems().then((toDos) => {
					dispatch({ type: "UPDATE_TODOS", toDos });
					dispatch({ type: "CLOSE_MODAL" });
				});
			});
		} else {
			createToDoItem(toDo.text).then(() => {
				getToDoItems().then((toDos) => {
					dispatch({ type: "UPDATE_TODOS", toDos });
					dispatch({ type: "CLOSE_MODAL" });
				});
			});
		}
	}

	function onEdit(toDo) {
		dispatch({ type: "EDIT_TODO", toDo });
	}

	function onDelete(toDo) {
		deleteToDoItem(toDo.id).then(() => {
			getToDoItems().then((toDos) => {
				dispatch({ type: "UPDATE_TODOS", toDos });
			});
		});
	}

	function createToDo() {
		dispatch({ type: "CREATE_TODO" });
	}

	function cancelModal() {
		dispatch({ type: "CLOSE_MODAL" });
	}

	return (
		<div className={styles.appContainer}>
			<header>
				<h1>ToDo List</h1>
				<SearchBar onSearch={onSearch} />
			</header>
			<main>
				<ul className={styles.toDolist}>
					{state.filteredToDos.map((toDo) =>
						ToDoListItem({ toDo, onEdit, onDelete })
					)}
				</ul>
				<button
					onClick={createToDo}
					className={styles.toDolist__btnCreate}
				></button>
				<ModalWindow
					isOpen={state.isModalOpen}
					onApply={onApply}
					onCancel={cancelModal}
					toDo={state.selectedToDo}
					className={styles.ModalWindow}
				/>
			</main>
		</div>
	);
}
