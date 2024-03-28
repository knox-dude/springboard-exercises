function App() {
    let andrewHobbies = ["scuba", "beer brewing", "videogames"]
    let albertHobbies = ["test1", "test2", "test3", "test4"]
    let adiHobbies = ["test5", "test6", "test7", "test8"]
    return (
        <div>
            <Person name="Andrew" age="25" hobbies={andrewHobbies}></Person>
            <Person name="Albertson" age="17" hobbies={albertHobbies}></Person>
            <Person name="Adi" age="22" hobbies={adiHobbies}></Person>
        </div>
    )
}