/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { useCreateTask } from './useCreateTask';
import { useEditTask } from './useEditTask';
import styled from 'styled-components';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useUser } from '../authentication/useUser';

const ButtonsBox = styled.div`
  display: flex;
  gap: 2.4rem;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  width: 20rem;
`;
const Select = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 0;
  box-shadow: var(--shadow-sm);
  width: 100%;
  min-width: 15rem;
  cursor: pointer;
`;
const TextArea = styled.textarea`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1rem;
  box-shadow: var(--shadow-sm);
  width: 100%;
  min-width: 15rem;
`;
function AddTaskForm({ closeModal, taskToEdit = {} }) {
  const { id: taskID, status } = taskToEdit;
  const isEditingMode = Boolean(taskID);
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditingMode
      ? {
          title: taskToEdit.title,
          description: taskToEdit.description,
          priority: taskToEdit.priority,
          dueDate: taskToEdit.dueDate,
        }
      : {},
  });

  const { errors } = formState;
  const { createTask, isCreating } = useCreateTask();
  const { updateTask, isUpdating } = useEditTask(taskID);
  const { user } = useUser();
  function onSubit(data) {
    if (isEditingMode) {

      updateTask({
        newTaskData: {
          created_at: taskToEdit.created_at,
          ...data,
        },
        id: taskID,
      });
      navigate(-1);
    } else {
      createTask({
        userId: user.user.id,
        status: 'not yet',
        ...data,
      });
      reset();
      closeModal();
    }
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubit)}
      type={isEditingMode ? 'regular' : 'modal'}
    >
      <FormRow label='Title *' error={errors?.title?.message}>
        <Input
          type='text'
          id='title'
          {...register('title', { required: 'your task should have a title' })}
        />
      </FormRow>
      <FormRow label='description'>
        <TextArea
          type='text'
          placeholder='optinal..'
          id='Description'
          {...register('description')}
        ></TextArea>
      </FormRow>
      <FormRow label='priority *' error={errors?.priority?.message}>
        <Select
          id='Priority'
          {...register('priority', {
            validate: (value) =>
              value !== '' || "you should set the task's priority",
          })}
        >
          <option value=''>Set prioroty</option>
          <option value='low'>low</option>
          <option value='medium'>medium</option>
          <option value='high'>high</option>
        </Select>
      </FormRow>
      <FormRow label='Set due data *' error={errors?.dueDate?.message}>
        <Input
          type='datetime-local'
          id='dueDate'
          {...register('dueDate', {
            required: 'you should set your due date',
          })}
        />
      </FormRow>
      {isEditingMode ? (
        <FormRow label='Task Status'>
          <Select id='status' {...register('status')} defaultValue={status}>
            <option value='done'>done</option>
            <option value='not yet'>not yet</option>
          </Select>
        </FormRow>
      ) : null}
      <ButtonsBox>
        <Button
          type='submit'
          disabled={isEditingMode ? isUpdating : isCreating}
        >
          {isEditingMode ? 'Editt Task' : 'Add'}
        </Button>
        <Button type='reset' variation='secondary'>
          reset
        </Button>
      </ButtonsBox>
    </Form>
  );
}

export default AddTaskForm;
