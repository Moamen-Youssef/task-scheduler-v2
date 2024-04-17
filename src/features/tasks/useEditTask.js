import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateTask as updateTaskAPI } from '../../services/apiTasks';

export function useEditTask(id) {
  const queryClient = useQueryClient();
  const {
    mutate: updateTask,
    status,
    error,
  } = useMutation({
    mutationFn: ({ newTaskData, id }) => updateTaskAPI(newTaskData, id),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['task', `${id}`] });
      queryClient.resetQueries({ queryKey: ['tasks'] });
      toast.success('task succefully updated');
    },
  });
  return { updateTask, isUpdating: status === 'pending', error };
}
