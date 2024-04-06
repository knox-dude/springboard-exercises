import PropTypes from "prop-types";
import "./Todo.css"

function Todo({ task, id, remove }) {

  const handleDelete = () => {remove(id);};
  
  return (
    <div className="Todo">
      <p>{task}</p>
      <button className="Todo-button" onClick={handleDelete}>X</button>
    </div>
  );
}

Todo.propTypes = {
  task: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  remove: PropTypes.func,
};

export default Todo;
