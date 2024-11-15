import { FilterStatus, MetaResponse, Todo, TodoInfo } from "../types/Todo";

const DOMEN = "https://easydev.club/api/v1";

export const fetchTodos = async (filterStatus: FilterStatus = FilterStatus.All): Promise<MetaResponse<Todo, TodoInfo>>=> {

    const url = `${DOMEN}/todos?filter=${filterStatus}`;
    const res = await fetch(url);

    if(!res.ok) throw new Error('Error getting response occured');

    return res.json();
    

}

export const getTodoById = async (id: number): Promise<Todo> => {
        
    const url = `${DOMEN}/todos/${id}`;
    const response = await fetch(url);

    if(!response.ok) throw new Error('Error getting response occured');

    return response.json();
}

export const createTodo = async (newTodo: Partial<Todo>): Promise<Todo> => {

    const url = `${DOMEN}/todos`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo), 
    });

    if (!response.ok) throw new Error('Network response was not ok');

    return response.json();
    
}

export const updateTodo = async (id: number, updatedData: Partial<Todo>): Promise<Todo> => {

    const url = `${DOMEN}/todos/${id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), 
    });

    if (!response.ok) throw new Error('Network response was not ok');

    return response.json(); 
    
}

export const deleteTodo = async (id: number): Promise<void> => {

    const response = await fetch(`${DOMEN}/todos/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Network response was not ok');

}