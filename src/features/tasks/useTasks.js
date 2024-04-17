import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../../services/apiTasks';

export function useTasks() {
  const {
    status,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
  return { isLoading: status === 'pending', tasks, error };
}
