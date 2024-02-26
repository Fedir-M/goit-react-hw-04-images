import { useEffect } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ getLargeImg, closeModal }) => {
  const closeForEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleCloseModal = e => {
    if (e.currentTarget !== e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeForEsc);

    return () => window.removeEventListener('keydown', closeForEsc);
  });

  return createPortal(
    <div className={s.overlay} onClick={handleCloseModal}>
      <div className={s.modalWrapper}>
        <img className={s.largeImg} src={getLargeImg} alt="Big img" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
