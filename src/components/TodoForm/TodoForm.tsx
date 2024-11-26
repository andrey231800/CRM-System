import React from 'react';
import styles from './style.module.scss';
import { Button, Input, Form } from 'antd';

type TodoFormProps = {
    addTodo: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({addTodo}) => {
    const [todoTitle, setTodoTitle] = React.useState<string>('');

    const [form] = Form.useForm();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setTodoTitle(e.target.value)
    }

    const handleSubmit = async () => {

        try {

            if(todoTitle.trim().length >= 2 && todoTitle.trim().length <= 64) {
                await addTodo(todoTitle.trim());
                setTodoTitle('');

                form.resetFields()
            } 
        } catch(e) {
            throw new Error(`Error submitting form: ${e}`)
        }

    }

    return (
        <div className={styles.wrapper}>
            <Form
                form={form}
                onFinish={handleSubmit}
                style={{display: 'flex', paddingTop: 30}}
            >

                <Form.Item
                    style={{width: 300}}
                    // label="Password"
                    name="password"
                    rules={[
                        {required: true, message: 'Введите название'},
                        {min: 2, message: 'Имя должно содержать минимум 2 символа.'},
                        {max: 64, message: 'Имя должно содержать не более 64 символов.'}
                    ]}

                >
                    <Input
                        type='text'
                        onChange={handleChange}
                        value={todoTitle}
                        placeholder='Task to be done...'
                    />
                    
                </Form.Item>
                <Form.Item label={null} style={{}}>
                    <Button htmlType="submit">Add</Button>
                </Form.Item>
            </Form>
        </div>
                
                
    );
};

export default TodoForm;