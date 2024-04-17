/* eslint-disable react/prop-types */
import { cloneElement, useContext } from 'react';
import { createContext, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import styled, { css } from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  border-radius: var(--border-radius-lg);
  padding: 4.2rem 4rem;
  ${(props) =>
    props.type === 'normal' &&
    css`
      background-color: var(--color-grey-50);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: var(--shadow-lg);
      transition: all 0.3s;
    `}
  ${(props) =>
    props.type === 'side-modal' &&
    css`
      display: flex;
      align-items: end;
      height: 100vh;
      background-color: rgba(249, 250, 251, 0.85);
    `}
`;

const Overlay = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;

  ${(props) =>
    props.type !== 'side-modal' &&
    css`
      backdrop-filter: blur(3.5px);
    `}
`;
const Button = styled.button`
  border: none;
  padding: 0.4rem;
  background: none;
  position: absolute;
  top: 0.6rem;
  right: 0.8rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.5rem);
  &:hover {
    background-color: var(--color-grey-100);
  }
  & svg {
    color: var(--color-grey-500);
    width: 2.4rem;
    height: 2.4rem;
  }
`;
const ModalContext = createContext();

function Modal({ children }) {
  const [openWindow, setOpenWindow] = useState('');
  function close() {
    setOpenWindow('');
  }
  const open = setOpenWindow;
  return (
    <ModalContext.Provider value={{ openWindow, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openWindowName) });
}
function Window({ children, name, type }) {
  const { close, openWindow } = useContext(ModalContext);
  if (name !== openWindow) return null;

  return (
    <Overlay type={type}>
      <StyledModal
        className='w-[28rem] sm:w-[60rem]  md:w-[70rem] lg:w-auto'
        type={type}
      >
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {cloneElement(children, { closeModal: () => close() })}
      </StyledModal>
    </Overlay>
  );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
