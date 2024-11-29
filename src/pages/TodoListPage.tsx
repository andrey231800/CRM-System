import { useEffect, useRef, useState } from 'react'
import { FilterStatus, Todo, TodoInfo } from '../types/Todo';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from '../api/TasksApi';
import TodoForm from '../components/TodoForm/TodoForm';
import FilterTabs from '../components/FilterTabs/FilterTabs';
import TodosList from '../components/TodosList/TodosList';
import { useLocation } from 'react-router';

const TodoListPage : React.FC = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.All);
    const [todoTabCounters, setTodoTabCounters] = useState<TodoInfo>({
        all: 0,
        inWork: 0,
        completed: 0
    })
    
    const location = useRef<string>(useLocation().pathname);
    const todosRef = useRef<Todo[]>(todos);

    useEffect(() => {
      updateTodosAndStatus();

      const interval = setInterval(() => {
        if(location.current === '/todo') {
            // autoUpdate();
            updateTodosAndStatus();
        }
        
      }, 5000);

      return () => clearInterval(interval)
      
    }, [])

    useEffect(() => {
        todosRef.current = todos;
    }, [todos])

    const updateTodosAndStatus = async (filter: FilterStatus = FilterStatus.All) => {
      try {
        const {info, data} = await fetchTodos(filter);

        setFilterStatus(filter);
        setTodos(data);
        if(info) {
          setTodoTabCounters({
            all: info?.all,
            completed: info?.completed,
            inWork: info?.inWork
         })
        }
        

      } catch(e) {
        throw new Error(`Error fetching data: ${e}`)
      }
    }


    const handleAddTodo = async (title: string) => {
    
        try {
          await createTodo({title: title, isDone: false});
          await updateTodosAndStatus(filterStatus);
        } catch(e) {
          throw new Error(`Error adding todo: ${e}`);
        }
        
    }
    
    const toggleTodoCompletion = async (id: number, isDone: boolean) => {
    
        try {
          await updateTodo(id, {isDone: !isDone});
          await updateTodosAndStatus(filterStatus)

        } catch (e) {
            
          throw new Error(`Error updating todo: ${e}`);
        }
    
        
    }
    
    const handleEditTodo = async (id: number, newTitle: string) => {
    
        try {
          await updateTodo(id, {title: newTitle});
          await updateTodosAndStatus(filterStatus)

        } catch (e) {
            
          throw new Error(`Error updating todo: ${e}`);
        }
        
        
    }
    
    const handleDeleteTodo = async (id: number) => {
    
        try {
            await deleteTodo(id);
            
            await updateTodosAndStatus(filterStatus);
        } catch (e) {
          throw new Error(`Error deleting todo: ${e}`);
        }
    }

  return (
      <div className='app'>
        <TodoForm
          addTodo={handleAddTodo}
        />
        <FilterTabs
          updateTodos={updateTodosAndStatus}
          tabs={todoTabCounters}
        />
        <TodosList
          todos={todos} 
          toggleCompleteTodo={toggleTodoCompletion}
          editTodo={handleEditTodo}
          deleteTodo={handleDeleteTodo}
        />
      </div>
    
  )
}

export default TodoListPage
