/* eslint-disable react/prop-types */
import { useUrlState } from './useUrlState';
import styled from 'styled-components';
import Button from '../../ui/Button';
import TasksFilters from './TasksFilters';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';

import { MdSort } from 'react-icons/md';
import { HiPlusCircle, HiFunnel } from 'react-icons/hi2';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import { RxComponentNone } from 'react-icons/rx';
import Spinner from '../../ui/Spinner';
import { useSort } from './useSort';

const MainContainer = styled.div`
  padding: 1rem;
`;
const OperationsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`;
const TasksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AlertText = styled.p`
  text-align: center;
  color: var(--color-grey-400);
  font-weight: 500;
  text-transform: capitalize;
  padding: 5rem;
`;
const filterOptions = [
  { label: 'status', options: ['done', 'not yet'] },
  { label: 'priority', options: ['low', 'medium', 'high'] },
  { label: 'dueDate' },
];
function Tasks({ tasks, isTasksLoading }) {
  const {
    taskUrlKeys,
    isAllFiltersApplied,
    setParam,
    getParam,
    deleteParam,
    setUrlParams,
  } = useUrlState();
  const { isSortingApplied, applyAscendingSort, applyDescendingSort } =
    useSort();
  if (isTasksLoading) return <Spinner />;

  // get the  keys Array from the url

  let filteredTasks;

  filteredTasks =
    (taskUrlKeys.length !== 0 && //filter the tasks that only meets all applied filters
      tasks.filter((task) => isAllFiltersApplied(task))) ||
    tasks;

  // sorting tasks by date
  if (isSortingApplied(taskUrlKeys)) {
    if (getParam('sortBy') === 'asc') {
      filteredTasks = applyAscendingSort(tasks);
    }
  }
  if (getParam('sortBy') === 'desc') {
    filteredTasks = applyDescendingSort(tasks);
  }

  function sortAscending() {
    setParam({ paramKey: 'sortBy', paramVal: 'asc' });
    setUrlParams();
  }

  function SortDescending() {
    setParam({ paramKey: 'sortBy', paramVal: 'desc' });
    setUrlParams();
  }

  function cancelSort() {
    deleteParam('sortBy');
    setUrlParams();
  }
  return (
    <MainContainer>
      <OperationsContainer>
        <div className='flex gap-4'>
          <Modal>
            <Modal.Open opens='filter-tasks'>
              <Button variation='secondary' size='small'>
                <HiFunnel />
                filters
              </Button>
            </Modal.Open>
            <Modal.Window name='filter-tasks' type='side-modal'>
              <TasksFilters filters={filterOptions} />
            </Modal.Window>
          </Modal>
          <Menus>
            <Menus.Toggle id={'sort'} type='normal'>
              <Button variation='secondary' size='small'>
                <MdSort />
                Sort By Date
              </Button>
            </Menus.Toggle>
            <Menus.List id={'sort'}>
              <Menus.Button handleClick={cancelSort}>
                <RxComponentNone />
                <p>none</p>
              </Menus.Button>
              <Menus.Button handleClick={sortAscending}>
                <HiSortAscending />
                <p>Asceding</p>
              </Menus.Button>
              <Menus.Button handleClick={SortDescending}>
                <HiSortDescending />
                <p>Descending</p>
              </Menus.Button>
            </Menus.List>
          </Menus>
        </div>

        <Modal>
          <Modal.Open opens='add-task-form'>
            <Button variation='secondary'>
              <HiPlusCircle />
            </Button>
          </Modal.Open>
          <Modal.Window name='add-task-form' type='normal'>
            <AddTaskForm />
          </Modal.Window>
        </Modal>
      </OperationsContainer>

      <TasksContainer className='h-[67vh] overflow-auto lg:w-full justify-center lg:justify-start content-start'>
        {/* check if the user has no tasks or no tasks match the filter */}
        {tasks.length !== 0 && filteredTasks?.length === 0 && (
          <AlertText>No tasks meet the specified filter criteria.</AlertText>
        )}
        {tasks.length === 0 && (
          <AlertText>start adding your tasks :)</AlertText>
        )}

        {/* map tasks */}
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </TasksContainer>
    </MainContainer>
  );
}

export default Tasks;
