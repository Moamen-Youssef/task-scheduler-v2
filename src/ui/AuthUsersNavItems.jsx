import { HiUserCircle } from 'react-icons/hi2';
import { ItemText, NavItem } from './Header';
import Logout from "../features/authentication/Logout"
import { useNavigate } from 'react-router-dom';

function AuthUsersNavItems() {
  const navigate = useNavigate();
  return (
    <>
      <NavItem onClick={()=> navigate("/user")}>
          <HiUserCircle />
        <ItemText> profile</ItemText>
      </NavItem>
     <Logout />
    </>
  );
}

export default AuthUsersNavItems;
