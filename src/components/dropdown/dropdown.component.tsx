import React from 'react';
import classes from './dropdown.module.scss';

type DropdownProps = {
  label: string;
  options: string[];
} & React.HTMLProps<HTMLSelectElement>;

export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, options, ...rest }, ref) => (
    <div className={classes.wrapper}>
      <label>{label}</label>
      <select ref={ref} {...rest}>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  )
);