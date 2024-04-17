import { useMutation } from '@tanstack/react-query';
import {
  updataUserEmail as updataUserEmailAPI,
  updateUserName as updateUserNameAPI,
} from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUserName() {
  const { mutate: updateUserName, status } = useMutation({
    mutationFn: updateUserNameAPI,
    onSuccess: () => {
      toast.success('your information succefully updated');
    },
  });

  return { updateUserName, isNameUpdating: status === 'pending' };
}

export function useUpdateUserEmail() {
  const { mutate: updateUserEmail, status } = useMutation({
    mutationFn: updataUserEmailAPI,
    onSuccess: () => {
      toast.success(
        'one step left to succefully cpmplete the email update, follow the confermation link to complete your update'
      );
    },
  });

  return { updateUserEmail, isEmailUpdating: status === 'pending' };
}
