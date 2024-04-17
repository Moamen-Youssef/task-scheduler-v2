import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export  function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, status } = useMutation({
    mutationFn:  ({ email, password }) =>  loginAPI({email, password}),
    onSuccess: (user) => {

      queryClient.setQueriesData(['user'], user);
      navigate('/home', {replace : true});
      toast.success('You have succefully loged in');
    },
    onError: () => {
      toast.error('In correct email or password');
    },
  });
  return { login, isLoading : status === "pending" };
}
