import { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() { 
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  }
  
  handleBackdropClick = e => { 
    if (e.target === e.currentTarget) { 
      this.props.onClose();
    }
  }

  render() { 
    return createPortal (
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          {/* <img src="" alt="" /> */}
          {this.props.children}
        </div>
      </div>,
      modalRoot
    )
  }
}
