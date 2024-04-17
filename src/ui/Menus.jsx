/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled, { css } from 'styled-components';

const StyledToggle = styled.button`
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  ${(props) =>
    props.type === 'box' &&
    css`
      transform: translate(0.4rem, -0.5rem);
    `}
  & :hover {
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-sm);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;
const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  & li {
    display: flex;
    gap: 1rem;
    align-items: center;
     & p{
      font-size: small;
      text-transform: capitalize;
     }
  }
`;
const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  & :not(:last-child) {
    border-bottom: solid 1px var(--color-grey-50);
  }
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState({});
  const open = setOpenId;
  const close = () => setOpenId('');

  return (
    <MenusContext.Provider
      value={{ open, close, openId, position, setPosition }}
    >
      <div>{children}</div>
    </MenusContext.Provider>
  );
}

function Toggle({ id, children, type }) {
  const { open, close, openId, setPosition } = useContext(MenusContext);

  const handleToggle = (e) => {
    id !== openId ? open(id) : close();

    const rect = e.target.closest('button').getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.right,
      y: rect.top + rect.height + 5,
    });
  };

  return (
    <StyledToggle onClick={handleToggle} type={type}>
      {children ? children :<HiEllipsisVertical />}
    </StyledToggle>
  );
}
function List({ children, id }) {
  const { position, openId } = useContext(MenusContext);
  if (openId !== id) return null;
  return createPortal(
    <StyledList position={position}>{children}</StyledList>,
    document.body
  );
}

function Button({ children , handleClick, disabled }) {
  const {close} = useContext(MenusContext);
  return (
    <StyledButton onClick={()=> {
      handleClick();
      close();

    }} disabled={disabled}>
      <li>{children}</li>
    </StyledButton>
  );
}
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
