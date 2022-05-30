import React, { FC } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  if (typeof document !== 'undefined') {
    return createPortal(
      <div className={`fixed inset-0 ${open ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-black ${
            open ? 'opacity-50' : 'pointer-events-none opacity-0'
          }`}
          onClick={onClose}
        />
        <div
          className={`fixed bg-neutral-100 dark:bg-neutral-800 dark:text-white left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-lg max-w-screen-sm p-4 rounded-lg ${
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
};
