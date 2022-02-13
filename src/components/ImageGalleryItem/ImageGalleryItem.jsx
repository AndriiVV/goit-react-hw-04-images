import { useState } from "react";
import Modal from "../Modal/Modal";

export default function ImageGalleryItem({key, imgURL, largeImg }) {

  const [showModal, setShowModal] = useState(false);
  
  const toggleModal = () => { 
    setShowModal(prev => (!prev))
  }

  return (
    <li className="ImageGalleryItem">
      <img src={imgURL} key={key} alt="" className="ImageGalleryItem-image" onClick={toggleModal} />
      {showModal &&
        <Modal onClose={toggleModal}>
          <img src={largeImg} alt="" />
        </Modal>}
    </li>
  )
  
} 
