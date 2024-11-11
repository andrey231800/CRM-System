import React, { useState } from 'react';
import TaskItem from './TodoItem';
import useTodos from '../hooks/useTodos';
import { Todo } from '../types/Todo';

const TodosList: React.FC = () => {

    const { todos} = useTodos();

    return (
        <div className="todos-list">
            {todos.map((todo: Todo) => (
            <TaskItem
                key={todo.id}
                todo={todo}
            />
            ))}
        
        </div>
    )
};

export default TodosList;