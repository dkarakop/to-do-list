import Modal from "react-modal";
import { useRef } from "react";
import styles from "./Modal.module.css";

export default function ModalWindow({ isOpen, onApply, onCancel, toDo }) {
	// Binding modal to our App
	Modal.setAppElement("#root");

	const inputRef = useRef(null);

	function afterOpenModal() {
		if (toDo) {
			inputRef.current.value = toDo.text;
		} else {
			inputRef.current.value = "";
		}

		inputRef.current.focus();

		const onEnter = function (event) {
			if (event.keyCode === 13) {
				apply(event);
				inputRef.current.removeEventListener("keydown", onEnter);
			}
		};

		inputRef.current.addEventListener("keydown", onEnter);
	}

	function apply(event) {
		event.preventDefault();
		if (toDo) {
			toDo.text = inputRef.current.value;
			onApply(toDo);
		} else {
			const newToDo = {
				id: null,
				text: inputRef.current.value,
				completed: false,
			};
			onApply(newToDo);
		}
		inputRef.current.value = "";
	}
	let toDoLabel = toDo ? "Edit Note" : "New Note";

	return (
		<div>
			<Modal
				isOpen={isOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={onCancel}
				className={styles.content}
				overlayClassName={styles.overlay}
				contentLabel="Create New Note"
			>
				<div className={styles.modal__headContainer}>
					<h2 className={styles.modal__header}>{toDoLabel}</h2>
					<label htmlFor="ToDo text"></label>
					<input
						type="text"
						name="ToDo text"
						className={styles.modal__input}
						placeholder="Input your note&hellip;"
						ref={inputRef}
					/>
				</div>
				<div className={styles.modal__btnContainer}>
					<button
						type="button"
						onClick={onCancel}
						className={styles.modal__btnCancel}
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={apply}
						className={styles.modal__btnApply}
					>
						Apply
					</button>
				</div>
			</Modal>
		</div>
	);
}
