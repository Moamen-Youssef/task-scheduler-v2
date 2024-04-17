import { HiMiniUser } from 'react-icons/hi2';
import { ItemText, NavItem } from '../../ui/Header';
import { useNavigate } from 'react-router-dom';

function LoginItem() {
  const navigate = useNavigate();
  return (
    <NavItem onClick={() => navigate('/login')}>
      <HiMiniUser />
      <ItemText>Log in</ItemText>
    </NavItem>
  );
}

export default LoginItem;
