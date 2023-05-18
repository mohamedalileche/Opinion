import { useState } from 'react';
import Modal from 'react-modal';
import NewProject from "../Components/NProject";

Modal.setAppElement("#root");

function Btnpost() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
    return (
        <div>
            <form action="">
                <button onClick={openModal} className=" rounded text-white">Ajouter</button>
                    <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                    <NewProject/>
                <button onClick={closeModal}>Fermer</button>
                    </Modal>
            </form>

        </div>
        
);
    };
export default Btnpost;
