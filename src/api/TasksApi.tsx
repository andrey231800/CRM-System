import { FilterStatus, MetaResponse, Todo, TodoInfo } from "../types/Todo";

const DOMEN = "https://easydev.club/api/v1";

export const fetchTodos = async (filterStatus: FilterStatus = FilterStatus.All): Promise<MetaResponse<Todo, TodoInfo>> => {

    try {
        const url = `${DOMEN}/todos?filter=${filterStatus}`;
        const res = await fetch(url);

        if(!res.ok) throw new Error('Error getting response occured');

        return res.json();
    } catch(e) {
        throw new Error(`Error getting response occured ${e}`);
    }


}

export const getTodoById = async (id: number): Promise<Todo> => {

    try {
        const url = `${DOMEN}/todos/${id}`;
        const response = await fetch(url);

        if(!response.ok) throw new Error('Error getting response occured');

        return response.json();
    } catch(e) {
        throw new Error(`Error getting response occured ${e}`);
    }
        
    
}

export const createTodo = async (newTodo: Partial<Todo>): Promise<Todo> => {

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

        return response.json();
    } catch(e) {
        throw new Error(`Error creating todo ${e}`);
    }
    
}

export const updateTodo = async (id: number, updatedData: Partial<Todo>): Promise<void> => {

    try {
        const url = `${DOMEN}/todos/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), 
        });

        if (!response.ok) throw new Error('Network response was not ok');

    } catch(e) {
        throw new Error(`Error updating todo ${e}`);
    }
    
}

export const deleteTodo = async (id: number): Promise<void> => {

    try {
        const response = await fetch(`${DOMEN}/todos/${id}`, {
            method: 'DELETE',
        });
    
        if (!response.ok) throw new Error('Network response was not ok');
    } catch(e) {
        throw new Error(`Error deleting todo ${e}`);
    }

}