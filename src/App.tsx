import FilterTabs from './components/FilterTabs/FilterTabs'
import TodosList from './components/TodosList/TodosList'
import TodoForm from './components/TodoForm/TodoForm'
import { useEffect, useState } from 'react'
import { FilterStatus, Todo, TodoInfo } from './types/Todo'
import { createTodo, deleteTodo, fetchTodos, getTodoById, updateTodo } from './api/TasksApi'
// import './styles/App.css'

const App : React.FC = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.All);
    const [todoTabCounters, setTodoTabCounters] = useState<TodoInfo>({
        all: 0,
        inWork: 0,
        completed: 0
    })

    useEffect(() => {
      updateTodosAndStatus();
      
    }, [])

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

export default App
