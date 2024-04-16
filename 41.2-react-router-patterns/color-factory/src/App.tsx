import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react";
import Home from "./Home";
import ColorForm from "./ColorForm";
import ColorDetail from "./ColorDetail";

interface Color {
  name: string;
  value: string;
}

interface AppProps {
  initialColors: Color[];
}

const defaultProps = [
  {
    name: "green",
    value: "#00FF00",
  },
  {
    name: "blue",
    value: "#0000FF",
  },
  {
    name: "red",
    value: "#FF0000",
  }
]

function App({initialColors}: AppProps) {

  initialColors = initialColors.length === 0 ? defaultProps : initialColors;

  const [colors, setColors] = useState(initialColors);

  const addColor = (color: Color) => {
    setColors([color, ...colors]);
  }

  const renderColorRoutes = () => {
    return colors.map((color) => (
      <Route 
        key={color.value}
        path={`/colors/${color.name}`}
        element= { <ColorDetail color={color} />}
      />
    ));
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/colors" element={<Home colors={colors} />} />
      <Route path="/colors/new" element={<ColorForm addColor={addColor} />} />
      {renderColorRoutes()}
      <Route path="*" element={<Navigate to="/colors" />} />
    </Routes>
    </BrowserRouter>
  )
}

App.defaultProps = {

}

export default App
