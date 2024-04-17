/* eslint-disable react/prop-types */

import {
  HiMiniChevronDoubleDown,
  HiMiniChevronDoubleRight,
} from 'react-icons/hi2';
import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';
import { useState } from 'react';

const Box = styled.div`
  padding: 1.2rem 0.4rem;
  border-bottom: solid 1px var(--color-grey-600);
  & h3 {
    font-weight: 600;
    color: var(--color-grey-600);
  }
`;
const BoxLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-grey-500);
  font-weight: 700;
`;
function ListBox({ labelName, children, active }) {
  const [isClicked, setIsClicked] = useState(active);
  return (
    <Box>
      <BoxLabel>
        <h3>{labelName}</h3>
        <ButtonIcon onClick={() => setIsClicked((c) => !c)}>
          {!isClicked ? (
            <HiMiniChevronDoubleRight />
          ) : (
            <HiMiniChevronDoubleDown />
          )}
        </ButtonIcon>
      </BoxLabel>
      <BoxContent>{isClicked ? children : ''}</BoxContent>
    </Box>
  );
}

export default ListBox;
