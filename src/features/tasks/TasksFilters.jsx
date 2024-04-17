/* eslint-disable react/prop-types */
import { useUrlState } from './useUrlState';

import styled from 'styled-components';
import ListBox from '../../ui/ListBox';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const SideContainer = styled.div`
  width: 86%;
  height: 96%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-top: 2rem;
`;
const OptionButton = styled.button`
  border: none;
  background: none;
  text-align: start;
  padding: 0.2rem 2.5rem;
  width: 70%;

  &.active {
    border: solid 1px var(--color-grey-400);
    background-color: var(--color-grey-100);
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: var(--color-grey-100);
  }
`;
const Option = styled.div`
  border: none;
  background: none;
  text-align: start;
  font-weight: 700;
  display: flex;
  flex-direction: column;

  color: var(--color-grey-600);
  align-items: center;
  padding: 2rem 0;
  gap: 1rem;

  & input {
    cursor: pointer;
  }
  & p {
    border: solid 1px var(--color-grey-400);
    padding: 0.5rem 1.5rem;
  }
`;

function TasksFilter({ filters, closeModal }) {
  const {
    isParamExisted,
    deleteParam,
    setParam,
    setUrlParams,
    getParam,
    resetFilters,
  } = useUrlState();

  function handleFilterOption(e) {
    //got the option's object of the clicked option
    const lableObj = filters.filter((filter) =>
      filter.options
        ? filter.options.some((op) => op === e.target.value)
        : filter
    )[0];

    const paramKeyValue = {
      paramKey: lableObj.label,
      paramVal: e.target.value,
    };
    //set the new key with its value and if it's existed delete it which affects cancling this filter
    isParamExisted(paramKeyValue)
      ? deleteParam(lableObj.label)
      : setParam(paramKeyValue);

    setUrlParams();
  }

  function handleResetFilters() {
    resetFilters();
    setUrlParams();
    closeModal();
  }

  return (
    <SideContainer>
      {filters.map((filter) =>
        filter.options ? (
          <ListBox
            key={filter.label}
            labelName={filter.label}
            active={getParam(filter.label)}
          >
            {filter?.options?.map((option) => (
              <OptionButton
                key={option}
                value={option}
                onClick={handleFilterOption}
                // to activate the selected option
                className={`${option === getParam(filter.label) && 'active'}`}
              >
                {option}
              </OptionButton>
            ))}
          </ListBox>
        ) : (
          <Option key={filter.label}>
            <p>--{filter.label}--</p>
            <Input type='date' onChange={handleFilterOption} />
          </Option>
        )
      )}
      <Button variation='secondary' onClick={handleResetFilters}>
        reset filters
      </Button>
    </SideContainer>
  );
}

export default TasksFilter;
