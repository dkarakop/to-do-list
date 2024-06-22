import Modal from "react-modal";
import { useState, useRef } from "react";
import { createToDoItem } from "../modules/api";

export default function ModalWindow({ onApply }) {
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};
	// bind modal to our App
	Modal.setAppElement("#root");

	let subtitle = "";
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const inputRef = useRef(null);

	function openModal() {
		setModalIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = "#f00";
	}

	function closeModal() {
		setModalIsOpen(false);
	}

	return (
		<div>
			<button onClick={openModal}>Open Modal</button>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Create New Note"
			>
				<h2 ref={(_subtitle) => (subtitle = _subtitle)}>New Note</h2>
				<form>
					<label htmlFor="New note"></label>
					<input
						type="text"
						className="newInput"
						placeholder="Input your note..."
						ref={inputRef}
					/>
					<button
						onClick={(e) => {
							e.preventDefault();
							onApply(inputRef.current.value);
							inputRef.current.value = "";
							closeModal();
						}}
					>
						Apply
					</button>
					<button onClick={closeModal}>Cancel</button>
				</form>
			</Modal>
		</div>
	);
}
