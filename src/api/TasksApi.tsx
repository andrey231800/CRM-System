import { MetaResponse, Todo, TodoInfo } from "../types/Todo";

export const getTodos = async (filterStatus: string = 'all'): Promise<MetaResponse<Todo, TodoInfo> | undefined >=> {

    try {
        const url = `https://easydev.club/api/v1/todos?filter=${filterStatus}`;
        const res = await fetch(url);

        if(!res.ok) throw new Error('Error getting response occured');

        const todos = await res.json();

        return todos
    } catch (e) {
        console.error(`Error fetching data: ${e}`);
    }

}

export const getTodoById = async (id: number): Promise<Todo | undefined> => {
        

    try {
        const url = `https://easydev.club/api/v1/todos/${id}`;
        const res = await fetch(url);

        if(!res.ok) throw new Error('Error getting response occured');

        const todo = await res.json();

        return todo
    } catch (e) {
        console.error(`Error fetching data: ${e}`);
    }
}