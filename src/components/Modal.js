import Modal from "react-modal";
import { useRef } from "react";
import styles from "./Modal.module.css";

export default function ModalWindow({ isOpen, onApply, onCancel, toDo }) {
	// Binding modal to our App
	Modal.setAppElement("#root");

	const inputRef = useRef(null);

	/**
	 *Setting up the input field (inputRef.current) inside an opened modal window.
	 * @param void
	 */
	function afterOpenModal() {
		// Setting input field value based on whether toDo exists
		if (toDo) {
			inputRef.current.value = toDo.text;
		} else {
			inputRef.current.value = "";
		}

		// Setting focus on the input field
		inputRef.current.focus();

		// Listening for Enter key press to apply changes
		const onEnter = function (event) {
			if (event.keyCode === 13) {
				apply(event);
				// Remove event listener after use
				inputRef.current.removeEventListener("keydown", onEnter);
			}
		};

		// Add event listener for Enter key press
		inputRef.current.addEventListener("keydown", onEnter);
	}

	/**
	 *Applying changes to a toDo item when the form is submitted, either by editing an existing toDo or creating a new one.
	 * @param event
	 */
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
		// Clearing the input field to reset the form for future use
		inputRef.current.value = "";
	}

	//* ----------------- JSX ----------------- *//
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
					<h2 className={styles.modal__header}>
						{toDo ? "Edit Note" : "New Note"}
					</h2>
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
