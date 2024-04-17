import { MdLogout } from 'react-icons/md';
import { useLogout } from './useLogout';
import { ItemText, NavItem } from '../../ui/Header';
function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <NavItem onClick={() => logout()}>
      {isLoading ? "Logingout..": <MdLogout />}
      <ItemText> log out </ItemText>
    </NavItem>
  );
}

export default Logout;
