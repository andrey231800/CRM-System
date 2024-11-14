import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import deleteIcon from "../../assets/delete-icon.png";
import editIcon from "../../assets/edit-icon.png";
import saveIcon from "../../assets/save-icon.png";
import cancelIcon from "../../assets/cancel-icon.png";
import styles from './style.module.scss';

interface TaskItemProps {
    todo: Todo;
    editTodo: (id: number, newTitle: string) => void;
    toggleCompleteTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TaskItemProps> = ({todo, editTodo, toggleCompleteTodo, deleteTodo}) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [todoTitle, setTodoTitle] = useState<string>(todo.title);

    // const {editTodo, toggleCompleteTodo, deleteTodo} = useTodos();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.code === 'Enter') {

            saveResult()
        }
    }

    const saveResult = () => {
        if(todoTitle.trim()) editTodo(todo.id, todoTitle);
        
        setIsEditing(false);
    }

    const handleCancel = () => {
        setTodoTitle(todo.title);
        setIsEditing(false)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.left_wrapper}>
                <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => toggleCompleteTodo(todo.id)}
                    className={`${styles.checkbox} ${todo.isDone ? styles.checkbox_checked : ''}`}
                />
                {isEditing ? 
                    <input 
                        type="text"
                        placeholder="Edit task"
                        value={todoTitle}
                        onChange={e => setTodoTitle(e.target.value)}
                        className={styles.edit}
                        onKeyDown={handleKeyDown}
                    />
                    :
                    <span
                        className={`${styles.title} ${todo.isDone ? styles.title_active : ""}`}
                        onClick={() => toggleCompleteTodo(todo.id)}
                    >
                        {todo.title}
                    </span>
                }
            </div>
            <div className={styles.right_wrapper}>
                <button className={styles.edit_button} onClick={
                    isEditing ?
                    () => saveResult() :
                    () => setIsEditing(!isEditing)
                    
                } >
                    <img src={isEditing ? saveIcon : editIcon} alt="edit icon" className={styles.edit_button_img} />
                </button>
                <button className={styles.delete_button} onClick={
                    isEditing ?
                    () => handleCancel() :
                    () => deleteTodo(todo.id)
                }>
                    <img src={isEditing ? cancelIcon : deleteIcon} alt="delete-img" className={styles.delete_button_img}/>
                </button>
            </div>
        </div>
    );
};

export default TodoItem;