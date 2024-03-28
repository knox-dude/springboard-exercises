function Person({name, age, hobbies=[]}) {
    return (
        <div>
            <p>Learn some information about this person.</p>
            <h3>{name.length > 6 ? `${name.substring(0,6)}.` : `${name}`}</h3>
            <h3>{age >= 18 ? "please go vote!" : "you must be 18."}</h3>
            <div className="hobbiesList">
                <h3>Hobbies:</h3>
                {hobbies.map((hobby, index) => (<p>{hobby}</p>))}
            </div>
        </div>
    )
}