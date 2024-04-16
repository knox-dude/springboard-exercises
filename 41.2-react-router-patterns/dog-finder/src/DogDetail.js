import { useParams } from "react-router-dom";

function DogDetail({dogs}) {

  const { name } = useParams();

  const dog = dogs.filter(dog => dog.name.toLowerCase() === name.toLowerCase())[0];
  console.log(dog);
  console.log(dog.facts);

  const dogFacts = (dog) => {
    return dog.facts.map(fact => (
      <li key={fact}>{fact}</li>
    ));
  }

  return (
    <div className="DogDetail">
      <h1 className="text-center">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3 sidebar">
            <ul class="list-unstyled">
              <li>Age: {dog.age}</li>
              {dogFacts(dog)}
            </ul>
          </div>
          <div class="col-md-9">
            <img src={`/${dog.src}`} class="img-fluid" alt="dog" />
          </div>
        </div> 
      </div>
    </div>
  );
}

export default DogDetail;