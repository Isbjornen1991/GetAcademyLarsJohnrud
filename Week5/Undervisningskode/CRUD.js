//Hva er et array?  ----------------------------------------------------------------------------------------------------------
//Et array brukes når vi vil lagre flere verdier i èn variabel

let fruits = ["Apple", "Banana", "Orange"];
console.log(fruits);

//Deklarering

let names = ["Anna", "Per", "Sara"];
let numbers = [10, 20, 30];
let mixed = ["Hei", 42, true];
let todoList = [];

//Index  ----------------------------------------------------------------------------------------------------------
//Elementer i et array har en index

console.log(fruits[0]); // Apple
console.log(fruits[1]); // Banana
console.log(fruits[2]); // Orange

//Vi kan også endre på en verdi ved hjelp av index:

fruits[1] = "Pear";

console.log(fruits);

// ["Apple", "Pear", "Orange"]

//Length
//Length er et tall på hvor mange elementer det er i arrayet

console.log(fruits.length); // 3

//Da kan vi bruke dem sammen for å finne det siste elementet i arrayet

console.log(fruits[fruits.length - 1]);

// Vanlige array metoder  ----------------------------------------------------------------------------------------------------------
//push() - legge til elementer

fruits.push("Melon");
console.log(fruits); // ["Apple", "Banana", "Orange", "Melon"]

//pop() - fjerner siste element

fruits.pop();
console.log(fruits); // ["Apple", "Banana", "Orange"]

//pop() returnerer også elementet som ble fjernet:

let removedFruit = fruits.pop();
console.log(removedFruit); // Orange
console.log(fruits); // ["Apple", "Banana"]

//unshift() - Legger til først i arrayet.

fruits.unshift("Apple");
console.log(fruits);

//shift() - Fjerner første element.

fruits.shift();
console.log(fruits);

//splice() - kan blant annet brukes til å fjerne et element på en bestemt index.

fruits.splice(0, 1);
console.log(fruits);
// 0 = start på index 0
// 1 = fjern ett element

//Loope gjennom et array  ----------------------------------------------------------------------------------------------------------

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

for (let fruit of fruits) {
  console.log(fruit);
}

//REFERANSETYPER VS VERDITYPER  ----------------------------------------------------------------------------------------------------------

//Verditype
//Tall og tekst kopieres som en verdi

let number1 = 10;
let number2 = number1;
number2 = 20;

console.log(number1); // 10
console.log(number2); // 20
//number2 får sin egen verdi.

//Arrays er referansetyper

let fruits1 = ["Apple", "Banana"];
let fruits2 = fruits1;

fruits2.push("Orange");

console.log(fruits1);
console.log(fruits2);
// Begge inneholder nå ["Apple", "Banana", "Orange"]

//Spread operator ... |  ----------------------------------------------------------------------------------------------------------

//Hvis vi faktisk vil lage et nytt array:

fruits1 = ["Apple", "Banana"];
fruits2 = [...fruits1];

fruits2.push("Orange");

console.log(fruits1);
// ["Apple", "Banana"]
console.log(fruits2);
// ["Apple", "Banana", "Orange"]

//Kan også brukes til å legge til noe:

let newFruits = [...fruits, "Orange"];
console.log(newFruits);

//CRUD ----------------------------------------------------------------------------------------------------------

let todos = ["Handle melk", "Gjøre lekser", "Trene"];

//Create
todos.push("Lage middag");

//Read
console.log(todos[0]);

//Update
todos[1] = "Gjøre JavaScript-lekser";

//Delete
todos.splice(1, 1);
