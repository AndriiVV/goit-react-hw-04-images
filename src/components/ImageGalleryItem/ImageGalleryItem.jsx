import { Component } from "react";
import Modal from "../Modal/Modal";

class ImageGalleryItem extends Component {

  state = {
    showModal: false,
  }
  
  toggleModal = () => { 
    this.setState(prev => ({showModal: !prev.showModal}))
  }

  render() { 
    const { id, imgURL, largeImg } = this.props;
    const { showModal } = this.state;
    return (
      <li className="ImageGalleryItem">
        <img src={imgURL} key={id} alt="" className="ImageGalleryItem-image" onClick={this.toggleModal} />
        {showModal &&
          <Modal onClose={this.toggleModal}>
            <img src={largeImg} alt="" />
          </Modal>}
      </li>
    )
  }
} 

export default ImageGalleryItem;