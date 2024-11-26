import { useEffect, useRef, useState } from 'react'
import { FilterStatus, Todo, TodoInfo } from '../types/Todo';
import { createTodo, deleteTodo, fetchTodos, getTodoById, updateTodo } from '../api/TasksApi';
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
            autoUpdate();
        }
        
      }, 5000);

      return () => clearInterval(interval)
      
    }, [])

    useEffect(() => {
        todosRef.current = todos;
    }, [todos])

    const autoUpdate = async () => {
        try {
            const {info, data} = await fetchTodos(filterStatus);
            const isEqual = isEqualTwoLists(data);

            if(!isEqual) {
                setFilterStatus(filterStatus);

                setTodos(data);

                if(info) {
                    setTodoTabCounters({
                        all: info?.all,
                        completed: info?.completed,
                        inWork: info?.inWork
                    })
                 }
            }
        } catch(e) {

        }
    }

    const isEqualTwoLists = (fetchedTodos: Todo[], currentTodos: Todo[] = todosRef.current): boolean => {
        
        if(fetchedTodos.length !== currentTodos.length) {
            console.log('not equal length')
            return false;
        } 

        const fetchedArraySorted = fetchedTodos.sort((a, b) => a.id - b.id);
        const currentArraySorted = currentTodos.sort((a, b) => a.id - b.id);

        for (let i = 0; i < fetchedArraySorted.length; i++) {
            const fetchedTodo = fetchedArraySorted[i];
            const currentTodo = currentArraySorted[i];

            const condition =
            fetchedTodo.id !== currentTodo.id || fetchedTodo.created !== currentTodo.created ||
            fetchedTodo.isDone !== currentTodo.isDone || fetchedTodo.title !== currentTodo.title;

            if(condition) {
                console.log('condition');
                
                return false
            } 
        }
        

        return true;
    }

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
    
    const toggleTodoCompletion = async (id: number) => {
    
        try {
          const todo = await getTodoById(id);
          await updateTodo(id, {title: todo?.title, isDone: !todo?.isDone});
          await updateTodosAndStatus(filterStatus)

        } catch (e) {
            
          throw new Error(`Error updating todo: ${e}`);
        }
    
        
    }
    
    const handleEditTodo = async (id: number, newTitle: string) => {
    
        try {
          const todo = await getTodoById(id);
          await updateTodo(id, {title: newTitle, isDone: todo?.isDone});
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
          filter={filterStatus}
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
