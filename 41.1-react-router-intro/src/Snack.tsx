import { Link } from "react-router-dom";

interface SnackProps {
    name: string;
    price: number;
}

function Snack({name, price}: SnackProps) {
    return (
        <div className="snack">
            <h4 className="snack-name">{name}</h4>
            <p className="snack-price">{price}</p>
            <Link className="snack-link-home" to="/">Go back</Link>
        </div>
    )
}

export default Snack