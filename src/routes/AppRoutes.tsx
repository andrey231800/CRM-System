import { Navigate, Route, Routes } from 'react-router';
import TodoListPage from '../pages/TodoListPage';
import UserProfilePage from '../pages/UserProfilePage';
import MenuComponent from '../components/MenuComponent/MenuComponent';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MenuComponent/>}>

                <Route index element={<Navigate to="todo" replace />} />

                <Route path='todo' element={<TodoListPage/>}/>
                <Route path='user' element={<UserProfilePage/>}/>

            </Route>
        </Routes>
    );
};

export default AppRoutes;