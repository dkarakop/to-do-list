import Modal from "react-modal";
import styles from "./ModalWindow.module.css";

export default function DeleteModalWindow({
	isOpen,
	toDo,
	onDelete,
	onCancel,
}) {
	Modal.setAppElement("#root");

	return (
		<>
			<Modal
				isOpen={isOpen}
				onRequestClose={onCancel}
				className={styles.content}
				overlayClassName={styles.overlay}
				contentLabel="Modal Window"
			>
				<div className={styles.modal__headContainer}>
					<h2 className={styles.modal__header}>
						Do you want to delete this to-Do?
					</h2>
				</div>
				<p>{toDo.text}</p>
				<div className={styles.modal__btnContainer}>
					<button
						type="button"
						onClick={onCancel}
						className={styles.modal__btnCancel}
					>
						No
					</button>
					<button
						type="button"
						onClick={() => onDelete(toDo)}
						className={styles.modal__btnDelete}
					>
						Yes
					</button>
				</div>
			</Modal>
		</>
	);
}
