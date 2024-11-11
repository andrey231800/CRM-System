import { useContext } from "react";
import TodosContext, { TodoContextType } from "../context/TaskContext";

const useTodos = (): TodoContextType => {
    const context = useContext(TodosContext);

    if (!context) {
        throw new Error('useTodos must be used within a TasksProvider');
    }
    return context
};

export default useTodos;