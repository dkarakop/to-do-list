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
import "../App.css";

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

	/**
	 * Reducer (pure) function for updating state.
	 * @param {*} state
	 * @param {*} action
	 * @returns ToDoApp's next state (newState)
	 */
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

	//* ------------------ Fetch ------------------ *//

	useEffect(() => {
		getToDoItems().then((toDos) => {
			dispatch({ type: "UPDATE_TODOS", toDos });
		});
	}, []);

	useEffect(() => {
		let updatedList = [];

		if (state.filters.text !== "") {
			updatedList = state.toDos.filter((toDo) =>
				toDo.text
					.toLowerCase()
					.includes(state.filters.text.toLowerCase())
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

	//* --------------- Event Handlers --------------- *//

	/**
	 *Updating the toDoApp's filters in the state managed by dispatching an UPDATE_FILTERS action based on the provided SearchBar's input.
	 * @param filters an object with text and status properties
	 */
	function onSearch(filters) {
		dispatch({ type: "UPDATE_FILTERS", filters });
	}

	/**
	 *Applying changes to a toDo item: it's creating a new one or editing an existing one based on its id.
	 It updates the toDoApp's state with the latest list of toDo items before closing the modal window.
	 * @param toDo
	 */
	function onApply(toDo) {
		if (toDo.text !== "") {
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
	}

	/**
	 *Editing the text of an existing toDo.
	 * @param toDo
	 */
	function onEdit(toDo) {
		dispatch({ type: "EDIT_TODO", toDo });
	}

	/**
	 *Deleting a toDo based on its id and Updating the toDoApp's state to reflect this change.
	 * @param toDo
	 */
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

	/**
	 * Toggling the completed status of an existing toDo item and Updating the toDoApp's state to reflect this change.
	 * @param toDo
	 */
	function onChecked(toDo) {
		toDo.completed = !toDo.completed;
		editToDoItem(toDo).then(() => {
			getToDoItems().then((toDos) => {
				dispatch({ type: "UPDATE_TODOS", toDos });
			});
		});
	}

	//* ------- Dark Theme Functionality ------- *//

	const bodyApp = document.querySelector("body");

	/**
	 * Toggling between default theme and dark theme.
	 */
	function onToggleDarkMode() {
		return bodyApp.classList.toggle("dark");
	}

	//* ----------------- JSX ----------------- *//
	return (
		<div className={styles.appContainer}>
			<header>
				<h1 className={styles.header__title}>ToDo List</h1>
				<SearchBar onSearch={onSearch} />
				<button
					className={styles.btnDarkMode}
					onClick={onToggleDarkMode}
				></button>
			</header>
			<main>
				<ul
					className={
						styles.toDolist +
						" " +
						(state.filteredToDos.length === 0
							? styles["toDoList--empty"]
							: "")
					}
				>
					{state.filteredToDos.map((toDo) => (
						<ToDoListItem
							key={toDo.id}
							toDo={toDo}
							onEdit={onEdit}
							onDelete={onDelete}
							onChecked={onChecked}
						></ToDoListItem>
					))}
				</ul>
				{state.filteredToDos.length === 0 ? (
					<div className={styles.emptyList}>
						<p>Empty &hellip;</p>
					</div>
				) : (
					""
				)}
				<div className={styles.toDoList__btnCreate_container}>
					<button
						onClick={createToDo}
						className={styles.toDoList__btnCreate}
					></button>
				</div>
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
