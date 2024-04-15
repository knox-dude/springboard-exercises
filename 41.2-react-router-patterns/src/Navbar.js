import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // got from ChatGPT
function Navbar({dogs}) {

  const dogLinks = () => {
    return dogs.map(dog => (
      <NavLink key={dog.name} to={`dogs/${dog.name.toLowerCase()}`}>{dog.name}</NavLink>
    ));
  }

  return (
    <nav>
      <NavLink to="/dogs">
        Home
      </NavLink>
      {dogLinks()}
    </nav>
  );
}


export default Navbar;