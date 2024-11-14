import { FilterStatus, MetaResponse, Todo, TodoInfo } from "../types/Todo";

const DOMEN = "https://easydev.club/api/v1/todos";

export const getTodos = async (filterStatus: FilterStatus = FilterStatus.All): Promise<MetaResponse<Todo, TodoInfo> | undefined >=> {

    try {
        const url = `${DOMEN}?filter=${filterStatus}`;
        const res = await fetch(url);

        if(!res.ok) throw new Error('Error getting response occured');

        const todos = await res.json();

        return todos
    } catch (e) {
        throw new Error(`Error fetching data: ${e}`);
    }

}

export const getTodoById = async (id: number): Promise<Todo | undefined> => {
        

    try {
        const url = `${DOMEN}/${id}`;
        const res = await fetch(url);

        if(!res.ok) throw new Error('Error getting response occured');

        const todo = await res.json();

        return todo
    } catch (e) {
        throw new Error(`Error fetching data: ${e}`);
    }
}