// Given this function
function createInstructor(firstName, lastName){
    return {
      firstName: firstName,
      lastName: lastName
    }
}
// Write an ES2015 Version
function createInstructorRefactored(firstName, lastName) {
    return {
        firstName,
        lastName
    }
}


// var favoriteNumber = 42;

// var instructor = {
//   firstName: "Colt"
// }

// instructor[favoriteNumber] = "That is my favorite!"

/* Write an ES2015 Version */

const favoriteNumber = 42;

const instructor = {
    firstname: "Colt",
    [favoriteNumber]: "That is my favorite!"
}

// var instructor2 = {
//     firstName: "Colt",
//     sayHi: function(){
//       return "Hi!";
//     },
//     sayBye: function(){
//       return this.firstName + " says bye!";
//     }
//   }

const instructor2 = {
    firstName: "Colt",
    sayHi() {
        return "Hi!"
    },
    sayBye() {
        return this.firstName+" says bye!"
    }
}

// **createAnimal function**

// Write a function which generates an animal object. The function should accepts 3 arguments:

// - species: the species of animal (‘cat’, ‘dog’)
// - verb: a string used to name a function (‘bark’, ‘bleet’)
// - noise: a string to be printed when above function is called (‘woof’, ‘baaa’)

// Use one or more of the object enhancements we’ve covered.

const createAnimal = (species, verb, noise) => {
    return {
        species,
        verb,
        [verb]() {
            return noise;
        }
    }
}