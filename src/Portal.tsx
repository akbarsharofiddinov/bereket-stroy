import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface IProps {
  children: ReactNode;
  container: HTMLElement;
}

function Portal({ children, container }: IProps) {
  return createPortal(children, container);
}

export default Portal;
