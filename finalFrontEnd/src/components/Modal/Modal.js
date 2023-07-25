import classes from "./Modal.module.css";
import React from "react";
import ReactDOM from "react-dom";
const Backdrop = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop} />;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
      <div style={{ textAlign: "right",marginTop:'40px' }}>
        <button onClick={props.onClick} className={classes.btn}>
          Ok
        </button>
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
     
        <Backdrop onClick={props.onClick}></Backdrop>,
   
      
        <ModalOverlay onClick={props.onClick}>{props.children}</ModalOverlay>,
       
    </React.Fragment>
  );
};
export default Modal;
