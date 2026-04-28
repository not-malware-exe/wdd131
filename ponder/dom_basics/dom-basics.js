//anytime we wnat to change DOM, use document
console.log(document); // prints html/DOM

// querySelector accepts any CSS selectors,
// returns one element
let firstList = document.querySelector(".list");
firstList.style.color = "#023572";

// getElementById accepts any CSS id selector names,
// returns one element because ids should be unique
let content = document.getElementById("content");
content.style.backgroundColor = "navy";

// setAttributes sets the attributes that are within the <>
let image = document.querySelector("img");
image.setAttribute("src", "images/byui-logo-blue.webp");
image.setAttribute("alt", "new alt tag");

// object parameters can be written and read
document.querySelector("h1").textContent = "Ooga Booga";
console.log(document.querySelector("h1").textContent);

document.getElementById("content").className = "content_but_also_class";

// querySelectorAll returns list of elements of CSS selector,
// index 0 is first element
document.querySelectorAll("ul")[0].style.backgroundColor = "green"