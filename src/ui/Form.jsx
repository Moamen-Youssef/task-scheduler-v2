/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const Form = styled.form`

  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-m);
      max-width: 60rem;
      margin: 1.1rem auto;
      height: 88vh;
      display: flex;
      flex-direction: column;
      gap: 2rem;     
    `}
  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;

    `}
    
  overflow: auto;
  font-size: 1.4rem;
`;


export default Form;


