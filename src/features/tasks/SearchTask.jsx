/* eslint-disable react/prop-types */
import { useState } from 'react';
import Input from '../../ui/Input';
import styled from 'styled-components';

const SearchField = styled.div`
  margin: 3rem auto;
`;
function SearchTask({ tasks, setTasks }) {
  const [searchedTask, setSearchedTask] = useState('');
  
  function handleSearchedTask(e) {
    //controlled input element
    const searchedValue = e.target.value;
    setSearchedTask(searchedValue);


    const resultedTasks = tasks.filter((task) =>
      task.title.includes(searchedValue)
    );
    //if there is a result
    //set the tasks to the result
    // if there is no result =>
    //we send an object with not found status and the message to be shown
    if (resultedTasks.length !== 0) {
      setTasks(resultedTasks);
    } else {
      setTasks({
        status: 'not found',
        message: `${searchedValue}`,
      });
    }
  }
  return (
    <SearchField className='w-1/2 md:w-1/3'>
      <Input
        type='text'
        placeholder='search your task'
        value={searchedTask}
        onChange={handleSearchedTask}
      />
    </SearchField>
  );
}

export default SearchTask;
