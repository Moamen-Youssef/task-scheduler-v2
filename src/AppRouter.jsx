import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import HomePage from './pages/HomePage';
import EditTask from './pages/EditTask';
import Landing from './pages/Landing';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to='/landing' />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* should be in protected route */}
          <Route path='/home' element={<HomePage />} />
          <Route element={<AppLayout />}></Route>
          <Route path='/task/:taskId' element={<EditTask />} />
          <Route path='/user' element={<UserProfile />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path='/landing' element={<Landing />} />
        </Route>
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
