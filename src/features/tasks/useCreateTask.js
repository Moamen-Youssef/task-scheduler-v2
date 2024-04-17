import { useMutation, useQueryClient } from '@tanstack/react-query';
import {toast} from "react-hot-toast"
import { addTask } from '../../services/apiTasks';

export function useCreateTask() {
  const QueryClient = useQueryClient();
  const { mutate: createTask, isLoading: isCreating } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      QueryClient.invalidateQueries(['tasks']);
      toast.success("your task succefully added")
      QueryClient.reset({ queryKey: ['user'] });
    },
  });

  return { createTask, isCreating };
}
