import React from 'react';
import TaskItem from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import styles from './style.module.scss';

type TodosListProps = {
    todos: Todo[],
    editTodo: (id: number, newTitle: string) => void;
    toggleCompleteTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodosList: React.FC<TodosListProps> = ({todos, editTodo, toggleCompleteTodo, deleteTodo}) => {

    return (
        <div className={styles.wrapper}>
            {todos.map((todo: Todo) => (
                <TaskItem
                    key={todo.id}
                    todo={todo}
                    editTodo={editTodo}
                    toggleCompleteTodo={toggleCompleteTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </div>
    )
};

export default TodosList;