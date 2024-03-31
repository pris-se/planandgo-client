import { useEffect, useState } from "react";
interface IModalProps {
  title: string;
  show: boolean;
  onClose: (e: boolean) => void;
  children: JSX.Element;
  id?: string;
}

export const Modal = (props: IModalProps) => {
  const [show, setShow] = useState(false);

  const closeHandler = () => {
    setShow(false);
    props.onClose(false);
    document.querySelector("body")?.classList.remove("lock");
  };

  useEffect(() => {
    setShow(props.show);
    document.querySelector("body")?.classList.add("lock");
    return () => document.querySelector("body")?.classList.remove("lock");

    
  }, [props.show]);

  if (!show) {
    return null;
  }
  return (
    <>
      <div
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0",
        }}
        className="overlay"
        onClick={closeHandler}
      ></div>
      <div
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0",
        }}
        className="popup"
        data-modal={props.id}
      >
        <div className="popup-header">
          <h2>{props.title}</h2>
          <span className="close" onClick={closeHandler}>
            &times;
          </span>
        </div>
        <div className="popup-content">{props.children}</div>
      </div>
    </>
  );
};
