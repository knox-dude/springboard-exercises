// Creates a new Li element, with option to add to storage or mark as complete
function createNewLi(textVal, addToStorage, isCompleted) {
    const newLi = document.createElement('li');
    const newButton = document.createElement('button');
    const buttonText = document.createTextNode("Remove Task");
    newButton.appendChild(buttonText);
    newLi.innerText = textVal;

    newLi.append(newButton);
    
    // keep track of completed by assigning class
    if (isCompleted) {
        newLi.classList.toggle('finished-task');
    }

    // add to localStorage, when new task is created from form
    if (addToStorage) {
        console.log(storedTasks);
        storedTasks.push({task:textVal, completed:isCompleted});
        localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
    }
    return newLi;
}

const form = document.querySelector('form');
let toDoList = document.querySelector('#to-do-list');

// Build the task list from localStorage
let storedTasks = JSON.parse(localStorage.getItem("storedTasks")) || [];
for (let taskInfo of storedTasks) {
    let newTodo = createNewLi(taskInfo.task, false, taskInfo.completed);
    toDoList.appendChild(newTodo);
}

// Event listener to create new task
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const newTaskInput = document.querySelector('#task');
    newLi = createNewLi(newTaskInput.value, true, false);
    toDoList.appendChild(newLi);
    form.reset();
})

toDoList.addEventListener("click", function(e) {
    let clicked = e.target;
    
    // Loop through, match the task name to the innerText of the li
    if (clicked.tagName == "LI") {
        clicked.classList.toggle('finished-task')
        for (let task of storedTasks) {
            // Couldn't just say clicked.innerText here, kind of annoying
            if (task.task == clicked.childNodes[0].wholeText) {
                task.completed = !task.completed;
                localStorage.setItem("storedTasks", JSON.stringify(storedTasks))
            }
        }
    }
    // Very similar to loop above but removes the li element
    if (clicked.tagName == "BUTTON") {
        console.log(storedTasks);
        for (let i = storedTasks.length-1; i > -1; i--) {
            if (storedTasks[i].task == clicked.parentElement.childNodes[0].wholeText) {
                storedTasks.splice(i, 1);
                localStorage.setItem("storedTasks", JSON.stringify(storedTasks))
            }
        }
        console.log(storedTasks);
        clicked.parentElement.remove();
    }
})