import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import AddTaskForm from '../features/tasks/AddTaskForm';
import { useTaskByID } from '../features/tasks/useTaskByID';
import Spinner from '../ui/Spinner';
function EditTask() {
    const queryClient = useQueryClient();

  const { taskId } = useParams();
  const { task, isLoading } = useTaskByID(taskId);
  if (isLoading) return <Spinner />;


  return <AddTaskForm taskToEdit={task} />;
}

export default EditTask;
