import { useState } from 'react';
import { ModalForm } from './components';

import classes from './App.module.scss';

export const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={classes.App}>
      <h2>Hypothetical Product</h2>
      <h4>The best product for your need!</h4>
      <h5>Donate any amount your deem fit to keep us giving you this service</h5>
      <button className={classes.button} onClick={openModal}>
        Payment
      </button>
      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}