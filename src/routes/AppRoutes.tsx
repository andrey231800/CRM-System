import { Navigate, Outlet, Route, Routes } from 'react-router';
import TodoListPage from '../pages/TodoListPage';
import UserProfilePage from '../pages/UserProfilePage';

import AuthPage from '../pages/AuthPage';
import RegistrationPage from '../pages/RegistrationPage';
import MenuComponent from '../components/MenuComponent/MenuComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const PublicRoute: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn)
    return isAuthenticated ? <Navigate to='/dashboard/todo' replace/> : <Outlet/> 
}

const PrivateRoute: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn)
    return isAuthenticated ? <Outlet/> : <Navigate to='/auth/login' replace/>
}

const AppRoutes = () => {
    return (
        <Routes>

            <Route element={<PrivateRoute/>}>
                <Route element={<MenuComponent/>}>
                    <Route path='dashboard/todo' element={<TodoListPage/>}/>
                    <Route path='dashboard/user' element={<UserProfilePage/>}/>
                </Route>
            </Route>

            <Route element={<PublicRoute/>}>
                <Route path='auth/login' element={<AuthPage/>}/>
                <Route path='auth/registration' element={<RegistrationPage/>}/>
            </Route>

            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            
        </Routes>
    );
};

export default AppRoutes;