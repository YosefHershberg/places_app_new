import { Route, Routes } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import Login from '@/components/auth/Login';
import NotFoundPage from '@/pages/NotFoundPage';
import Register from '@/components/auth/Register';
import Users from '@/components/users/Users';
import UserPlaces from '@/components/users/UserPlaces';
import NewPlace from '@/components/places/NewPlace';
import UpdatePlace from '@/components/places/UpdatePlace';

function App() {

  return (
    <Routes>
      <Route path='/' element={<AppLayout />} >
        <Route index element={<Users />} />
        <Route path='/auth'>
          <Route index path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/places'>
          <Route path='new' element={<NewPlace />}/>
          <Route path='update' element={<UpdatePlace />}/>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App
