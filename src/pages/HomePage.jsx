import SearchTask from '../features/tasks/SearchTask';
import Tasks from '../features/tasks/Tasks';
import styled from 'styled-components';
import { HiOutlineXCircle } from 'react-icons/hi2';
import { useActualUserTasks } from '../features/tasks/useActualUserTasks';

const NotFoundText = styled.p`
  padding: 0.6rem;
  width: 60%;
  margin: 8rem auto;
  text-align: center;
  color: var(--color-grey-500);
  & span {
    font-weight: 800;
    padding: 0 0.4rem;
    color: var(--color-red-700);

    & svg {
      width: 2.4rem;
      height: 2.4rem;
      display: inline;
      color: var(--color-grey-700);
    }
  }
`;

function HomePage() {
  const {  userTasks, searchResultedTasks, setNewResultedTasks, isLoading  } =
    useActualUserTasks();
  // resulted from the search


  return (
    <>
      <SearchTask tasks={userTasks} setTasks={setNewResultedTasks} />

      {/* render the resulted tasks and if not,
       "not found" message will appear to the user ,
       and if there is nothing to search 
      about the user tasks will be rendered normally */}
      {searchResultedTasks?.status === 'not found' ? (
        <NotFoundText>
          <span>
            <HiOutlineXCircle />
          </span>
          The task named <span>{searchResultedTasks.message}</span> was not
          found. Please try a valid task name
        </NotFoundText>
      ) : (
        <Tasks tasks={searchResultedTasks ? searchResultedTasks : userTasks} isTasksLoading={isLoading}/>
      )}
    </>
  );
}

export default HomePage;
