
import { useNavigate } from "react-router-dom";

interface Color {
  name: string;
  value: string;
}

interface ColorFormProps {
  addColor: ({name, value}: Color) => void;
}

function ColorForm({addColor}: ColorFormProps) {

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const name = (event.target as HTMLFormElement).colorName.value;
    const value = (event.target as HTMLFormElement).color.value;
    addColor({name, value});
    navigate("/colors");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Color Name:
        <input type="text" name="colorName" onChange={ (e) => (e.target as HTMLInputElement).value = e.target.value }/>
      </label>
      <label>
        Color:
        <input type="color" name="color" onChange={(e) => (e.target as HTMLInputElement).value = e.target.value }/>
      </label>
      <button type="submit">Add Color</button>
    </form>
  );
}


export default ColorForm