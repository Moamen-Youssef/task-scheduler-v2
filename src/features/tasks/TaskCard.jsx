/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useDeleteTask } from './useDeleteTask';
import { useEditTask } from '../../features/tasks/useEditTask';
import styled, { css } from 'styled-components';
import Input from '../../ui/Input';
import Menus from '../../ui/Menus';
import {
  HiOutlineCalendar,
  HiOutlineCalendarDays,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2';
import { FaCircleDot } from 'react-icons/fa6';
import { formatDate } from '../../utils/helpers';

const priorityColor = {
  low: css`
    color: var(--color-grey-400);
  `,
  medium: css`
    color: var(--color-green-700);
  `,
  high: css`
    color: var(--color-red-700);
  `,
};
const CardBox = styled.div`
  border: solid 1px var(--color-brand-800);
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: var(--border-radius-md);
`;
const StatusBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & input[type='checkbox'] {
    height: 2.4rem;
    width: 2.4rem;
    border-radius: 50%;
    outline-offset: 1px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:not(:last-child) {
      border: solid 1px var(--color-grey-300);
      padding: 0.2rem 0.6rem;
      border-radius: 2rem;
      width: 13.5rem;
      background-color: var(--color-grey-100);
      color: var(--color-grey-600);
      & svg {
        ${(props) => priorityColor[props.priority]}
      }
    }
    & p {
      font-size: 1.7rem;
      font-weight: 600;
      color: var(--color-grey-600);
    }
  }
`;

const Description = styled.div`
  border-bottom: solid 1px;
  margin-top: 0.8rem;
  padding: 0.2rem 0.5rem;
  h1 {
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  p {
    font-size: smaller;
  }
`;
const Dates = styled.div`
  margin: 1rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const DateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  p {
    font-size: 1.3rem;
    color: var(--color-grey-700);
  }
  span {
    font-weight: 600;
  }
  & svg {
    color: var(--color-grey-400);
    width: 2rem;
    height: 2rem;
  }
`;
function TaskCard({ task }) {
  const {
    title,
    description,
    status,
    priority,
    created_at: created,
    dueDate,
    id,
  } = task;
  const navigate = useNavigate();
  const { deleteTask, isDeleting } = useDeleteTask();
  const { updateTask } = useEditTask(id);
  const onTaskCheck = (e) =>
    updateTask({
      newTaskData: {
        status: e.target.checked ? 'done' : 'not yet',
        title,
        description,
        priority,
        created_at: created,
        dueDate,
      },
      id,
    });
  return (
    <CardBox className='w-[31.5rem] sm:w-[29rem]  md:w-[27rem] lg:w-[26rem] xl:w-[28rem]'>
      <StatusBox priority={priority}>
        <Input
          type='checkbox'
          defaultChecked={status === 'done'}
          onChange={onTaskCheck}
        />

        <div>
          <p>{priority}</p>
          <FaCircleDot />
        </div>

        <div>
          <Menus>
            <Menus.Toggle id={id} type='box'/>
            <Menus.List id={id}>
              <Menus.Button handleClick={() => navigate(`/task/${id}`)}>
                <HiPencil />
                <p>Edit Task</p>
              </Menus.Button>
              <Menus.Button handleClick={() => deleteTask(id)} disabled={isDeleting}>
                <HiTrash />
                <p>{isDeleting ? "Deleting..." : "Delete task"}</p>
              </Menus.Button>
            </Menus.List>
          </Menus>
        </div>
        
      </StatusBox>

      <Description>
        <h1>{title}</h1>
        <p style={{ color: description ? 'var(--color-grey-400)' : 'white' }}>
          {description ? description : 'normal text'}
        </p>
      </Description>

      <Dates>
        <DateBox>
          <HiOutlineCalendar />
          <p>
            <span>Created at : </span>
            {formatDate(created)}
          </p>
        </DateBox>
        <DateBox>
          <HiOutlineCalendarDays />
          <p>
            <span>Due to : </span>
            {formatDate(dueDate)}
          </p>
        </DateBox>
      </Dates>
    </CardBox>
  );
}

export default TaskCard;
