import FilterTabs from './components/FilterTabs/FilterTabs'
import TodosList from './components/TodosList/TodosList'
import TodoForm from './components/TodoForm/TodoForm'
import { useEffect, useState } from 'react'
import { FilterStatus, Todo, TodoInfo, TodoRequest } from './types/Todo'
import { getTodoById, getTodos } from './api/TasksApi'
// import './styles/App.css'

const App : React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
    const [tabs, setTabs] = useState<TodoInfo>({
        all: 0,
        inWork: 0,
        completed: 0
    })

    useEffect(() => {

        loadTasks();
    }, []);

    useEffect(() => {
        
        setTodosCount();

    }, [todos])

    useEffect(() => {

        loadTasks();

    }, [filter])

    const loadTasks = async () => {

        const fetchedTodos = await getTodos(filter);


        if(fetchedTodos) {
          setTodos(fetchedTodos.data)
          // console.log(fetchedTodos.data)
        } 

    }

    const setTodosCount = async () => {

        const fetchedTodos = await getTodos(filter);

        if(fetchedTodos?.info) setTabs({
            all: fetchedTodos.info.all,
            completed: fetchedTodos.info.completed,
            inWork: fetchedTodos.info.inWork,
        })

        
    }

    const DOMEN = 'https://easydev.club/api/v1';

    const addTodo = async (title: string) => {

        const newTodo = {title: title, isDone: false};
    
        try {
            const url = `${DOMEN}/todos`;
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newTodo), 
            });
      
            if (!response.ok) throw new Error('Network response was not ok');
      
            const addedTodo: Todo = await response.json(); 
    
            await loadTasks();
            // setTodos(prevTodos => [...prevTodos, addedTodo]);
    
            console.log('Todo added:', addedTodo);
          } catch (error) {
            console.error('Error adding todo:', error);
          }
        
    }
    
    const toggleTodoCompletion = async (id: number) => {

    
        const todo = await getTodoById(id);
        const updatedTodo: TodoRequest = {title: todo?.title, isDone: !todo?.isDone};
    
        try {
            const url = `${DOMEN}/todos/${id}`;
            const response = await fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedTodo), 
            });
      
            if (!response.ok) throw new Error('Network response was not ok');
      
            const addedTodo: Todo = await response.json(); 
    
            // setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? addedTodo : todo));
    
            await loadTasks();
    
            console.log('Todo updated:', addedTodo);
          } catch (error) {
            console.error('Error updating todo:', error);
        }
    
        
    }
    
    const editTodo = async (id: number, newTitle: string) => {
    
        const todo = await getTodoById(id);
        const updatedTodo: TodoRequest = {title: newTitle, isDone: todo?.isDone};
    
        try {
            const url = `${DOMEN}/todos/${id}`;
            const response = await fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedTodo), 
            });
      
            if (!response.ok) throw new Error('Network response was not ok');
      
            const addedTodo: Todo = await response.json(); 
            await loadTasks();
    
            // setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? addedTodo : todo));
    
            console.log('Todo updated:', addedTodo);
          } catch (e) {
            throw new Error(`Error updating todo: ${e}`)
        }
        
        
    }
    
    const deleteTodo = async (id: number) => {
    
        try {
            const response = await fetch(`${DOMEN}/todos/${id}`, {
              method: 'DELETE',
            });
      
            if (!response.ok) throw new Error('Network response was not ok');
      
            // setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
            await loadTasks();
        } catch (e) {
          throw new Error(`Error deleting todo: ${e}`);
        }
    }

  return (
      <div className='app'>
        <TodoForm
          addTodo={addTodo}
        />
        <FilterTabs
          filter={filter}
          setFilter={setFilter}
          tabs={tabs}
        />
        <TodosList
         todos={todos} 
         toggleCompleteTodo={toggleTodoCompletion}
         editTodo={editTodo}
         deleteTodo={deleteTodo}
        />
      </div>
    
  )
}

export default App
