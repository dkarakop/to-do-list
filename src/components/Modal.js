import Modal from "react-modal";
import { useRef, useEffect } from "react";
import { getToDoItems } from "../modules/api";
import styles from "./Modal.module.css";

export default function ModalWindow({ isOpen, onApply, onCancel, toDo }) {
	// bind modal to our App
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

	return (
		<div>
			<Modal
				isOpen={isOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={onCancel}
				// className={styles.modalWindow}
				// overlayClassName={styles.overlay}
				className={styles.content}
				overlayClassName={styles.overlay}
				contentLabel="Create New Note"
			>
				<div className={styles.modal__headContainer}>
					<h2 className={styles.modal__header}>
						{toDo ? "Edit Note" : "New Note"}
					</h2>
					<label htmlFor="New note"></label>
					<input
						type="text"
						className={styles.modal__input}
						placeholder="Input your note..."
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
