import React, { useState } from 'react';
import { Todo } from '../../../types/Todo';
import styles from './style.module.scss';
import { Button, Checkbox, Form, Input} from 'antd';
import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';

interface TaskItemProps {
    todo: Todo;
    editTodo: (id: number, newTitle: string) => void;
    toggleCompleteTodo: (id: number, isDone: boolean) => void;
    deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TaskItemProps> = ({todo, editTodo, toggleCompleteTodo, deleteTodo}) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [todoTitle, setTodoTitle] = useState<string>(todo.title);

    const [form] = useForm();

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.code === 'Enter') {

            saveResult()
        }
    }

    const updateInput = () => {
        form.setFieldsValue({ title: todoTitle });
    };

    const saveResult = () => {
        if(todoTitle.trim()) editTodo(todo.id, todoTitle);
        
        setIsEditing(false);
    }

    const handleCancel = () => {
        setTodoTitle(todo.title);
        setIsEditing(false)
    }

    const handleFinish = () => {
        isEditing ? saveResult() : setIsEditing(!isEditing);
        updateInput();
    }

    return (
        <Form
            initialValues={{title: todoTitle}}
            onFinish={handleFinish}
            form={form}
        >
            <div className={styles.wrapper}>
                <div className={styles.left_wrapper}>
                    <Checkbox
                        checked={todo.isDone}
                        onChange={() => toggleCompleteTodo(todo.id, todo.isDone)}
                    />
                    {isEditing ? 
                        <Form.Item
                            name="title"
                            rules={[
                                {required: true, message: 'Введите название'},
                                {min: 2, message: 'Имя меньше 2 символов'},
                                {max: 64, message: 'Имя больше 64 символов'}
                            ]}
                            style={{margin: 0}}
                            
                        >
                            <Input 
                                placeholder="Edit task"
                                // value={todoTitle}
                                onChange={e => setTodoTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className={styles.edit}
                            />
                        </Form.Item> 
                        :
                        <span
                            className={`${styles.title} ${todo.isDone ? styles.title_active : ""}`}
                            onClick={() => toggleCompleteTodo(todo.id, todo.isDone)}
                        >
                            {todo.title}
                        </span>
                    }
                </div>
                <div className={styles.right_wrapper}>
                    {/* <Space> */}
                        <Button 
                            icon={<SaveOutlined/>}
                            type='primary'
                            htmlType='submit'
                            style={{display: isEditing ? 'block' : 'none', marginRight: "6px"}}

                        />
                        <Button 
                            icon={<EditOutlined/>}
                            type='primary'
                            htmlType='submit'
                            style={{display: isEditing ? 'none' : 'block', marginRight: "6px"}}
                        />
                        <Button 
                            danger
                            onClick={handleCancel}
                            icon={<CloseOutlined/>}
                            style={{display: isEditing ? 'block' : 'none'}}
                        />
                        <Button 
                            danger
                            onClick={() => deleteTodo(todo.id)}
                            icon={<DeleteOutlined/>}
                            style={{display: isEditing ? 'none' : 'block'}}
                        />
                    {/* </Space> */}
                </div>
            </div>
        </Form>  
    );
};

export default TodoItem;