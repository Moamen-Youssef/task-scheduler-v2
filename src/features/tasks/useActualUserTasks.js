import { useState } from 'react';
import { useUser } from '../authentication/useUser';
import { useTasks } from './useTasks';

export function useActualUserTasks() {
  const [searchResultedTasks, setNewResultedTasks] = useState(null);

  const { tasks, isLoading } = useTasks();
  const { user } = useUser();

  const userTasks = tasks?.filter((task) => task.userId === user.user.id);

  return { isLoading, userTasks, searchResultedTasks, setNewResultedTasks };
}
