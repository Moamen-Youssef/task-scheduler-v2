import styled from "styled-components";

const Input = styled.input`
border: 1px solid var(--color-grey-200);
background-color: var(--color-grey-50);
border-radius: var(--border-radius-sm);
padding: 0.8rem 1.2rem;
box-shadow: var(--shadow-sm);
width: 100%;
&:not([type='checkbox']){
    min-width: 18rem;
}
color: var(--color-grey-700);
&::placeholder{
    font-weight: 600;
    font-size: smaller;
}
`;

export default Input;
