import SignUpForm from '../features/authentication/SignUpForm';
import { useUser } from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';
function UserProfile() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  
  return <SignUpForm currentUser={user.user} />;
}

export default UserProfile;
