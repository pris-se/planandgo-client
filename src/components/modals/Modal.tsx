import React, { ReactElement, useEffect, useState } from 'react'
import "../modals/modal.css";

interface IModalProps {
    title: string,
    show: boolean,
    onClose: (e: boolean) => void,
    children: JSX.Element,
  };

export const Modal = (props:IModalProps) => {
    const [show, setShow] = useState(false);

    const closeHandler = () => {
      setShow(false);
      props.onClose(false);
    };
  
    useEffect(() => {
      setShow(props.show);
    }, [props.show]);
  
    return (
      <div
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0"
        }}
        className="overlay"
      >
        <div className="popup">
            <div className='popup-header'>
                <h2>{props.title}</h2>
                <span className="close" onClick={closeHandler}>
                    &times;
                </span>
            </div>
          <div className="popup-content">{props.children}</div>
        </div>
      </div>
    );
}

