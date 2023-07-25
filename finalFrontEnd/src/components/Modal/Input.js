import classes from "./Input.module.css";
import { forwardRef } from "react";
const Input = forwardRef((props,ref) => {

  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref}id={props.input.id} {...props.input}></input>
    </div>
  );
});
export default Input;
