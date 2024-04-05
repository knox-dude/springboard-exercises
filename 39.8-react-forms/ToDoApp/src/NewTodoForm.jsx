import { useState } from "react";
import propTypes from "prop-types"
import { v4 as uuid } from "uuid";

function NewTodoForm( { createTodo } ) {
    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        createTodo({ task, id: uuid() });
        setTask("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}

NewTodoForm.propTypes = {
    createTodo: propTypes.func.isRequired,
}

export default NewTodoForm;