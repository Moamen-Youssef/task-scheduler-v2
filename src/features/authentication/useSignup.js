import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp as signUpAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signUp, status } = useMutation({
    mutationFn: ({ fullName, email, password, firstName, lastName }) =>
      signUpAPI({ fullName, email, password, firstName, lastName }),
    onSuccess: (data) => {
      console.log(status);
      queryClient.setQueriesData(['user'], data.user);
      navigate('/home');
      toast.success('You Succefully created an account ! ');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signUp, isLoading: status === 'pending' };
}
