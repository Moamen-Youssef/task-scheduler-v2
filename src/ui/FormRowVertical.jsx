/* eslint-disable react/prop-types */

import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1rem 0;
`;
const Label = styled.label`
  font-weight: 600;
  text-transform: capitalize;
`;
function FormRowVertical({ children, label }) {
  return (
    <StyledFormRow>
      <Label htmlFor={children.props.id}>{label}</Label>
      {children}
    </StyledFormRow>
  );
}

export default FormRowVertical;
