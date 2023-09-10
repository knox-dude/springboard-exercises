const form = document.querySelector('form');
const toDoList = document.querySelector('#to-do-list');

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const newTaskInput = document.querySelector('#task');
    console.log(newTaskInput);
    const newLi = document.createElement('li');
    const newButton = document.createElement('button');
    newLi.innerText = newTaskInput.value;
    newButton.innerText = "Remove Task";

    newLi.append(newButton);
    toDoList.append(newLi);
    form.reset();
})

toDoList.addEventListener("click", function(e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle('finished-task')
    }
    if (e.target.tagName == "BUTTON") {
        e.target.parentElement.remove();
    }
})