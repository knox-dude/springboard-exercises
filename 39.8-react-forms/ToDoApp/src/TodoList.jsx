import { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function ToDoList() {
    const [todos, setTodos] = useState([]);

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleAdd = (todo) => {
        setTodos([...todos, todo]);
    };

    const todoComponents = todos?.map((todo) => {
        return (
            <Todo
                key={todo.id}
                task={todo.task}
                id={todo.id}
                remove={handleDelete}
            />
        );
    })

    return (
        <div className="TodoList">
            <NewTodoForm createTodo={handleAdd} />
            <ul>
                {todoComponents}
            </ul>
        </div>
    )

}

export default ToDoList;