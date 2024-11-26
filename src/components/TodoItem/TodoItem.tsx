import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import styles from './style.module.scss';
import { Button, Checkbox, Input, Space} from 'antd';
import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

interface TaskItemProps {
    todo: Todo;
    editTodo: (id: number, newTitle: string) => void;
    toggleCompleteTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TaskItemProps> = ({todo, editTodo, toggleCompleteTodo, deleteTodo}) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [todoTitle, setTodoTitle] = useState<string>(todo.title);

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
                <Checkbox
                    checked={todo.isDone}
                    onChange={() => toggleCompleteTodo(todo.id)}
                />
                {isEditing ? 
                    <Input 
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
                <Space>
                    <Button 
                        icon={isEditing ? <SaveOutlined/> : <EditOutlined/>}
                        onClick={isEditing ? () => saveResult() : () => setIsEditing(!isEditing)} 
                        type='primary'
                    />
                    <Button 
                        danger
                        onClick={isEditing ? () => handleCancel() : () => deleteTodo(todo.id)}
                        icon={isEditing ? <CloseOutlined/> : <DeleteOutlined/>}
                    />
                </Space>
            </div>
        </div>
    );
};

export default TodoItem;