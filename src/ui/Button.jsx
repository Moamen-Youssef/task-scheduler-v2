import { css } from 'styled-components';
import styled from 'styled-components';

/* eslint-disable react/prop-types */

// const fixedButton = {
//   position: css`
//   position: absolute;
//   top: 16rem;
//   left: 0.4rem;
//   border: solid 1.5px ;
//   background: transparent;
//   ` 
// }
const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;

    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    text-transform: uppercase;

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-700);
  }

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
  /* ${(props) => (props.position === 'fixed' ? "" : '')} */

&:has(svg) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
  & svg {
    width: 2.3em;
    height: 2.3rem;
    color: var(--color-brand-700);
  }
`;
Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
};

export default Button;
