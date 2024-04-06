import { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

// Define interface for Todo
interface TodoProps {
  id: string;
  text: string;
}

function TodoList() {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const removeTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const addTodo = (text: string, id: string) => {
    setTodos([...todos, {id, text}]);
  }

  const todoComponents = todos.map((todo: TodoProps) => (
    <Todo 
      key={todo.id} 
      id={todo.id} 
      text={todo.text} 
      remove={removeTodo}
    />
  ));

  return (
    <div>
      <NewTodoForm addTodo={addTodo} />
      <ul>
        {todoComponents}
      </ul>
    </div>
  )
}

export default TodoList;
