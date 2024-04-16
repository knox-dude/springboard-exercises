import { Link } from "react-router-dom";

interface Color {
  name: string;
  value: string;
}

type Props = {colors: Color[]};

function Home(props: Props) {

  const renderColorLinks = () => {
    return props.colors.map((color) => (
      <li key={color.value}>
        <Link to={`/colors/${color.name}`}>{color.name}</Link>
      </li>
    ));
  }

  return (
    <div>
      <h2>Colors:</h2>
      <ul>
        {renderColorLinks()}
      </ul>
      <h2>Add One!</h2>
      <Link to="/colors/new">New Color</Link>
    </div>

  )
}

export default Home