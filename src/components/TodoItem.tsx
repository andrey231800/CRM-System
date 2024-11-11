import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import deleteIcon from "../assets/delete-icon.png";
import editIcon from "../assets/edit-icon.png";
import useTodos from '../hooks/useTodos';

interface TaskItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TaskItemProps> = ({todo}) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [todoTitle, setTodoTitle] = useState<string>(todo.title);

    const {editTodo, toggleCompleteTodo, deleteTodo} = useTodos();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.code === 'Enter') {

            saveResult()
        }
    }

    const saveResult = () => {
        if(todoTitle.trim()) editTodo(todo.id, todoTitle);
        
        setIsEditing(false);
    }

    return (
        <div className="todo-item">
            <div className='todo-item__left-wrapper'>
                <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => toggleCompleteTodo(todo.id)}
                    className={`todo-item__checkbox ${todo.isDone ? "todo-item__checkbox-checked" : ''}`}
                />
                {isEditing ? 
                    <input 
                        type="text"
                        placeholder="Edit task"
                        value={todoTitle}
                        onChange={e => setTodoTitle(e.target.value)}
                        className="todo-item__input"
                        onKeyDown={handleKeyDown}
                    />
                    :
                    <span
                        className={`todo-item__title ${todo.isDone ? "todo-item__title-active" : ""}`}
                        onClick={() => toggleCompleteTodo(todo.id)}
                    >
                        {todo.title}
                    </span>
                }
            </div>
            <div className='todo-item__right-wrapper'>
                <button className="todo-item__edit-button" onClick={
                    isEditing ?
                    () => saveResult() :
                    () => setIsEditing(!isEditing)
                    
                } >
                    <img src={editIcon} alt="edit icon" />
                </button>
                <button className="todo-item__delete-button" onClick={() => deleteTodo(todo.id)} >
                    <img src={deleteIcon} alt="delete-img"/>
                </button>
            </div>
        </div>
    );
};

export default TodoItem;