import VendingMachine from "./VendingMachine";
import Snack from "./Snack";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

	const vendingMachineChoices = [
		{"name":"water", "price":10},
		{"name":"milk", "price":20},
    {"name":"chocolate", "price":30},
    {"name":"soda", "price":40},
    {"name":"tea", "price":50},
    {"name":"coffee", "price":60},
	]

	const renderSnacks = () => {
		return vendingMachineChoices.map((item, index) => {
			return (
        <Route 
					key={index} 
					path={`/${item.name}`} 
					element={<Snack name={item.name} price={item.price} />}
				/>
      );
		})
	}

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VendingMachine choices={vendingMachineChoices.map(item => item.name)}/>} />
          {renderSnacks()}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
