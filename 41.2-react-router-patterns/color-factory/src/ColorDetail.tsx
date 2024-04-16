import { useNavigate } from "react-router-dom";

interface ColorDetailProps {
  name: string;
  value: string;
}
type Props = {color: ColorDetailProps}

function ColorDetail(props: Props) {
  const navigate = useNavigate();

  return (
    <div className="color-detail" style={{backgroundColor:props.color.value}}>
      <h1>Wow, it's {props.color.name}!</h1>
      <p>So much... {props.color.name}!</p>
      <button onClick={() => navigate(`/colors`)}>Go back</button>
    </div>
  )
}

export default ColorDetail;