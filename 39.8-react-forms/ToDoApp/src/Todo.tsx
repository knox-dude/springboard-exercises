interface TodoProps {
  id: string;
  text: string;
  remove: (id: string) => void;
}

function Todo({ id, text, remove }: TodoProps) {

  const removeTodo = () => {
    remove(id);
  }

  return (
    <div>
      <p>{text}</p>
      <button onClick={removeTodo}>Remove</button>
    </div>
  );
}

export default Todo;
