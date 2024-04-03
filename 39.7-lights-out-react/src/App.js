import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <h1 className="AppTitle">Lights Out Game</h1>
      <h4 className="AppSubtitle">Make all squares gray!</h4>
      <Board />
    </div>
  );
}

export default App;
