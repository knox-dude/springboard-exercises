// 1. Select the section with an id of container without using querySelector.
document.getElementById("container");

// 2. Select the section with an id of container using querySelector.
document.querySelector("#container");

// 3. Select all of the list items with a class of “second”.
document.getElementsByClassName("second");

// 4. Select a list item with a class of third, but only the list item inside 
// of the ol tag.
document.querySelector(".third ol");

// 5. Give the section with an id of container the text “Hello!”.
let containerIdSection = document.querySelector("#container");
containerIdSection.innerText = "Hello!";

// 6. Add the class main to the div with a class of footer.
let footer = document.querySelector(".footer");
footer.classList.add("main");

// 7. Remove the class main on the div with a class of footer.
footer.classList.remove("main");

// 8. Create a new li element.
let newLiElement = document.createElement("li");

// 9. Give the li the text "four"
newLiElement.innerText = "four";

// 10. Append the li to the ul element.
let ulList = document.querySelector("ul");
ulList.appendChild(newLiElement)

// 11. Loop over all of the lis inside the ol tag and give them a background 
// color of “green”.
olLis = document.querySelectorAll("ol li")
for (let li of olLis) {
  li.style.backgroundColor = "green";
}

// 12. Remove the div with a class of footer
footer = document.querySelector(".footer");
footer.remove();