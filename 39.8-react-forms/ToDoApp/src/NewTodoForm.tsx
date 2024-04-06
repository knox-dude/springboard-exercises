import { useState } from 'react';
import { v4 as uuid } from 'uuid';

interface NewTodoFormProps {
  addTodo: (text: string, id: string) => void;
}

function NewTodoForm({ addTodo }: NewTodoFormProps) {
  const [text, setText] = useState("");
  const id = uuid();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(text, id);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default NewTodoForm;