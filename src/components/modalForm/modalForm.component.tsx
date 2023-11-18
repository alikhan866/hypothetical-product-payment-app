/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from 'react-modal';
import { Dropdown, FormField } from '..';
import { amountValidation, emailValidation, fromValidation, mockApiResponse, submitFormData } from '../../utils';
import Confetti from 'react-confetti'

import classes from './modalForm.module.scss';
import styles from '../../App.module.scss'

type FormValues = {
  to: string;
  from: string;
  amount: number;
  description?: string;
};

type ModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormValues>({
    mode: 'onChange',
  });

  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [apiSuccessMessage, setApiSuccessMessage] = useState('');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await mockApiResponse(data as unknown as submitFormData);
      setApiSuccessMessage(response.message);
    } catch (error: any) {
      if (error.status === 400 || error.status === 500) {
        setApiErrorMessage(error.message);
      } else if (error.status === 401) {
        // Redirect to login page
      }
    }
  };

  const renderModalBody = useCallback(() => {
    if (apiErrorMessage) {
      return (
        <div className={classes.error}>
          <span>{apiErrorMessage}</span>
          <button onClick={() => setApiErrorMessage('')} className={styles.button}>Retry</button>
        </div>
      )
    }
    if (apiSuccessMessage) {
      return (
        <div className={classes.success}>
          <Confetti
            width={400}
            height={150}
            numberOfPieces={300}
            recycle={false}
          />
          <span>{apiSuccessMessage}</span>
          <button
            onClick={() => {
              setApiSuccessMessage('');
              reset();
              onClose();
            }}
            className={styles.button}
          >
            Close
          </button>
        </div>
      )
    }
    return (
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>Payment</h3>
        <FormField
          label="To"
          type="email"
          {...register('to', emailValidation)}
        />
        {errors.to && <span className={classes.error_text}>{errors.to.message}</span>}

        <Dropdown
          label="From"
          options={['USD', 'INR']}
          {...register('from', fromValidation)}
        />
        {errors.from && <span className={classes.error_text}>{errors.from.message}</span>}

        <FormField
          label="Amount"
          type="number"
          {...register('amount', amountValidation)}
        />
        {errors.amount && <span className={classes.error_text}>{errors.amount.message}</span>}

        <FormField
          label="Description"
          type="text"
          {...register('description')}
        />

        <button type="submit" disabled={!isValid} className={styles.button}>Submit</button>
      </form>
    )
  }, [apiErrorMessage, apiSuccessMessage, errors.amount,
    errors.from, errors.to, handleSubmit,
    isValid, onClose, register, reset
  ])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classes.modal}
      overlayClassName={classes.modalOverlay}
      ariaHideApp={false}
    >
      {renderModalBody()}
    </Modal>
  );
};
