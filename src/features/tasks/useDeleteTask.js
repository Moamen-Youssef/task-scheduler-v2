import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteTask as deleteTaskAPI } from '../../services/apiTasks';
import Spinner from '../../ui/Spinner';

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteTask,
    status,
    error,
  } = useMutation({
    mutationFn: deleteTaskAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task succefully deleted');
    },
  });
  return { deleteTask, isDeleting: status === 'pending', error };
}
