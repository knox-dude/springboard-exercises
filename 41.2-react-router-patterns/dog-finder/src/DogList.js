import React from "react";
import { Link } from "react-router-dom";
import "./DogList.css"

function DogList({ dogs }) {
  return (
    <div className="DogList">
      <div className="row mt-4">
        <div className="col">
          <h2 className="text-center">
            I copied/plaguarized this page from the solution
          </h2>
        </div>
      </div>
      <div className="row">
        {dogs.map(d => (
          <div className="col-3 text-center" key={d.name}>
            <img src={`/${d.src}`} alt={d.name} />
            <h3 className="mt-3">
              <Link to={`/dogs/${d.name.toLowerCase()}`}>{d.name}</Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DogList;