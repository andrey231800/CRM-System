import React from 'react';
import useTodos from '../hooks/useTodos';

const TodoForm: React.FC = () => {
    const [todoTitle, setTodoTitle] = React.useState<string>('');

    const {addTodo} = useTodos();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(todoTitle.trim().length) {
            addTodo(todoTitle);
        } 

        setTodoTitle('');

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="todo-form">
                <div className="todo-form__input-wrapper">
                    <input 
                        type="text"
                        placeholder="Task to be done..."
                        value={todoTitle}
                        onChange={e => setTodoTitle(e.target.value)}
                        className="todo-form__input"
                    />
                </div>
                 <button type="submit" className="todo-form__add-button">
                    Add
                 </button>
            </form>
        </div>
    );
};

export default TodoForm;