import React from 'react';
import classes from './formField.module.scss';

type FormFieldProps = {
  label: string;
  type: string;
} & React.HTMLProps<HTMLInputElement>;

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(({ label, type, ...rest }, ref) => (
  <div className={classes.wrapper}>
    <label>{label}</label>
    <input ref={ref} type={type} {...rest} />
  </div>
));