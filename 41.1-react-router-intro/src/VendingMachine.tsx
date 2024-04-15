import { Link } from "react-router-dom";

interface VendingMachineProps {
  choices: string[];
}

function VendingMachine({choices}: VendingMachineProps) {
  const renderChoices = () => {
    return choices.map((choice) => {
      return (
        <Link to={`/${choice}`}>
          <div className="vending-machine-choice">{choice}</div>
        </Link>
      );
    });
  };

  return (
    <div className="vending-machine">
      <h1>Vending Machine Choices</h1>
      <nav className="vending-machine-nav">
        <div className="vending-machine-nav-choices">{renderChoices()}</div>
      </nav>
    </div>
  );
}

export default VendingMachine;
