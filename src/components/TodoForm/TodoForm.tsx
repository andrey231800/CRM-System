import React from 'react';
import styles from './style.module.scss';

type TodoFormProps = {
    addTodo: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({addTodo}) => {
    const [todoTitle, setTodoTitle] = React.useState<string>('');
    const [errorBoundary, setErrorBoundary] = React.useState<boolean>(false);

    // const {addTodo} = useTodos();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setTodoTitle(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(todoTitle.trim().length >= 2 && todoTitle.trim().length <= 64) {
            await addTodo(todoTitle.trim());
            setTodoTitle('');
        } else {
            setErrorBoundary(true);

            setTimeout(() => setErrorBoundary(false), 1000);
        }
        

    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.input_wrapper}>
                    <input 
                        type="text"
                        placeholder="Task to be done..."
                        value={todoTitle}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                 <button type="submit" className={styles.add_button}>
                    Add
                 </button>
            </form>
            <span className={`${styles.error} ${errorBoundary ? styles.error_active : ""}`}>XXX</span>
        </div>
    );
};

export default TodoForm;