/* eslint-disable react/prop-types */
import { cloneElement, useEffect } from 'react';
import { useUser } from './features/authentication/useUser';
import Spinner from './ui/Spinner';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: var(--color-grey-50);
`;
function ProtectedRoute({ children }) {
  //1. load the authinticated user
  const { user, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  //2. if the user is no user navigate to the landing page
  useEffect(() => {
    if (!user && !isLoading) navigate('/landing' , {replace: true});
  }, [user, navigate, isLoading]);

  //3. while loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );
  //4. if there is a user render the app

  if (isAuthenticated)
    return cloneElement(children, { isAuthenticated, isLoading });
}

export default ProtectedRoute;
