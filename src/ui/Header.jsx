/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledHeader = styled.nav`
  background-color: var(--color-grey-100);
  padding: 0.3rem 0.1rem;
  border-radius: var(--border-radius-sm);
  display: flex;
  justify-content: end;
  box-shadow: var(--shadow-sm);
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 0.4rem 0.3rem;
  width: 20rem;
`;
export const NavItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem;
  gap: 0.3rem;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  &:hover {
    background-color: var(--color-grey-0);
  }
  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-700);
  }
`;
export const ItemText = styled.p`
  color: var(--color-grey-700);
  text-transform: capitalize;
  font-weight: 600;
  font-size: smaller;
`;
function Header({ children }) {
  return (
    <StyledHeader>
      <Ul className='w-1/2 md:w-1/4 lg:w-1/5'>{children}</Ul>
    </StyledHeader>
  );
}

export default Header;
