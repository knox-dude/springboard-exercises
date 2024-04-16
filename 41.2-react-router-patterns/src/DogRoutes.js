import { Routes, Route, Navigate } from "react-router-dom"
import DogList from "./DogList";
import DogDetail from "./DogDetail";

function DogRoutes({dogs}) {
  return (
    <Routes>
      <Route 
        exact path="/dogs" 
        element={<DogList dogs={dogs}/>}
      />
      <Route 
        path="/dogs/:name"
        element={<DogDetail dogs={dogs}/>}
      /> 
      <Route 
        path="/*"
        element={<Navigate to="/dogs" />}
      />
    </Routes>
  )
}

export default DogRoutes;