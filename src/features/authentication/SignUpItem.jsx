import { HiMiniUserPlus } from 'react-icons/hi2';
import { ItemText, NavItem } from '../../ui/Header';
import { useNavigate } from 'react-router-dom';

function SignUpItem() {
    const navigate = useNavigate();
    return (
    <NavItem onClick={() => navigate('/signup')}>
      <HiMiniUserPlus />
      <ItemText>sign up</ItemText>
    </NavItem>
  );
}

export default SignUpItem;
