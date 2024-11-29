import { Navigate, Route, Routes } from 'react-router';
import TodoListPage from '../pages/TodoListPage';
import UserProfilePage from '../pages/UserProfilePage';
import LayoutComponent from '../components/LayoutComponent/LayoutComponent';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<LayoutComponent/>}>

                <Route index element={<Navigate to="todo" replace />} />

                <Route path='todo' element={<TodoListPage/>}/>
                <Route path='user' element={<UserProfilePage/>}/>

            </Route>
        </Routes>
    );
};

export default AppRoutes;