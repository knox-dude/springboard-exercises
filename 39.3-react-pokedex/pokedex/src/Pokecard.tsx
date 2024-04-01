import './Pokecard.css'

function Pokecard(props: {id: number, name: string, type: string, base_experience: number}) {
    // Full url: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png
    const POKECARD_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
    return (
        <div className="col m-2 p-2" style={{ minWidth: '250px'}}>
            <div className="pokecard d-flex flex-column align-items-center justify-content-center text-align-center p-1 m-1">
                <h3 className="pokecard-name">{props.name}</h3>
                <img src={POKECARD_URL} alt={props.name} />
                <p>Type: {props.type}</p>
                <p>EXP: {props.base_experience}</p>
            </div>
        </div>
    )

}

export default Pokecard