import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { getTodoById, getTodos } from '../api/TasksApi';
import { Todo, TodoInfo, TodoRequest} from '../types/Todo';

export type TodoContextType = {
    todos: Todo[];
    filter: string;
    setFilter: (filter: string) => void;
    tabs: TodoInfo
    addTodo: (title: string) => void;
    editTodo: (id: number, newTitle: string) => void;
    toggleCompleteTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
};

interface TodosProviderProps {
    children: ReactNode;
}

const TodosContext = createContext<TodoContextType | undefined>(undefined)

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<string>('all');
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


        if(fetchedTodos) setTodos(fetchedTodos.data)

    }

    const setTodosCount = async () => {
        const fetchedTodos = await getTodos(filter);

        if(fetchedTodos?.info) setTabs({
            all: fetchedTodos.info.all,
            completed: fetchedTodos.info.completed,
            inWork: fetchedTodos.info.inWork,
        })

        
    }

    const addTodo = async (title: string) => {

        const newTodo = {title: title, isDone: false};
    
        try {
            const url = 'https://easydev.club/api/v1/todos';
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newTodo), 
            });
      
            if (!response.ok) throw new Error('Network response was not ok');
      
            const addedTodo: Todo = await response.json(); 
    
            // loadTasks();
            setTodos(prevTodos => [...prevTodos, addedTodo]);
    
            console.log('Todo added:', addedTodo);
          } catch (error) {
            console.error('Error adding todo:', error);
          }
        
    }
    
    const toggleTodoCompletion = async (id: number) => {

    
        const todo = await getTodoById(id);
        const updatedTodo: TodoRequest = {title: todo?.title, isDone: !todo?.isDone};
    
        try {
            const url = `https://easydev.club/api/v1/todos/${id}`;
            const response = await fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedTodo), 
            });
      
            if (!response.ok) throw new Error('Network response was not ok');
      
            const addedTodo: Todo = await response.json(); 
    
            setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? addedTodo : todo));
    
            loadTasks();
    
            console.log('Todo updated:', addedTodo);
          } catch (error) {
            console.error('Error updating todo:', error);
        }
    
        
    }
    
    const editTodo = async (id: number, newTitle: string) => {
    
        const todo = await getTodoById(id);
        const updatedTodo: TodoRequest = {title: newTitle, isDone: todo?.isDone};
    
        try {
            const url = `https://easydev.club/api/v1/todos/${id}`;
            const response = await fetch(url, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedTodo), 
            });
      
            if (!response.ok) throw new Error('Network response was not ok');
      
            const addedTodo: Todo = await response.json(); 
    
            setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? addedTodo : todo));
    
            console.log('Todo updated:', addedTodo);
          } catch (error) {
            console.error('Error updating todo:', error);
        }
        
        
    }
    
    const deleteTodo = async (id: number) => {
    
        try {
            const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
              method: 'DELETE',
            });
      
            if (!response.ok) throw new Error('Network response was not ok');
      
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    return (
        <TodosContext.Provider value={{todos: todos, filter: filter, setFilter: setFilter, tabs: tabs, addTodo: addTodo, toggleCompleteTodo: toggleTodoCompletion, deleteTodo: deleteTodo, editTodo: editTodo}}>
            {children}
        </TodosContext.Provider>
    );
};

export default TodosContext;