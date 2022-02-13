import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

export default function Modal ({onClose, children}) {

  useEffect(() => { 
    window.addEventListener('keydown', handleEsc);
    return () => {window.removeEventListener('keydown', handleEsc); }
  }, [])

  const handleEsc = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  }
  
  const handleBackdropClick = e => { 
    if (e.target === e.currentTarget) { 
      onClose();
    }
  }
  
  return createPortal (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        {children}
      </div>
    </div>,
    modalRoot
  )
  
}
