/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../ui/Header';
import AuthUsersNavItems from './AuthUsersNavItems';
import LandingNavItems from './LandingNavItems';

const StyledAppLayout = styled.div`
  overflow: hidden;
`;
const Main = styled.main`
  height: 93vh;
  overflow: hidden;
`;

function AppLayout({ isAuthenticated  }) {
  
  return (
    <StyledAppLayout>
      <Header>
        {isAuthenticated ? <AuthUsersNavItems /> : <LandingNavItems />}
      </Header>
      <Main>
       {<Outlet />}
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
