import PropTypes from "prop-types";

function Todo({ task, id, remove }) {

  const handleDelete = () => {remove(id);};
  
  return (
    <div className="Todo">
      <p>{task}</p>
      <button onClick={handleDelete}>X</button>
    </div>
  );
}

Todo.propTypes = {
  task: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  remove: PropTypes.func,
};

export default Todo;
