import axios from "axios";
import { FilterStatus, MetaResponse, Todo, TodoInfo } from "../types/Todo";

const DOMEN = "https://easydev.club/api/v1";

export const fetchTodos = async (filterStatus: FilterStatus = FilterStatus.All): Promise<MetaResponse<Todo, TodoInfo>> => {

    try {
        const url = `${DOMEN}/todos?filter=${filterStatus}`;
        const res = await axios.get(url);

        if(res.status !== 200) throw new Error(`Error getting response occured ${res.status}`);

        return res.data;
    } catch(e) {
        throw new Error(`Error getting response occured ${e}`);
    }

}

export const getTodoById = async (id: number): Promise<Todo> => {

    try {
        const url = `${DOMEN}/todos/${id}`;
        const response = await axios.get(url);


        if(response.status !== 200) throw new Error('Error getting response occured');

        return response.data;
    } catch(e) {
        throw new Error(`Error getting response occured ${e}`);
    } 
    
}

export const createTodo = async (newTodo: Partial<Todo>): Promise<Todo> => {

    try {
        const url = `${DOMEN}/todos`;

        const response = await axios.post(url, newTodo);

        if (response.status !== 200) throw new Error('Network response was not ok');

        return response.data;
    } catch(e) {
        throw new Error(`Error creating todo ${e}`);
    }
    
}

export const updateTodo = async (id: number, updatedData: Partial<Todo>): Promise<void> => {

    try {
        const url = `${DOMEN}/todos/${id}`;

        const response = await axios.put(url, updatedData);

        if (response.status !== 200) throw new Error('Network response was not ok');

    } catch(e) {
        throw new Error(`Error updating todo ${e}`);
    }
    
}

export const deleteTodo = async (id: number): Promise<void> => {

    try {
        const url = `${DOMEN}/todos/${id}`;

        const response = await axios.delete(url);
    
        if (response.status !== 200) throw new Error('Network response was not ok');
    } catch(e) {
        throw new Error(`Error deleting todo ${e}`);
    }

}