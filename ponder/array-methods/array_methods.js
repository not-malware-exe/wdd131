class UrMom{
    constructor(){
        this.weight_pounds = 99999999999999999999
    }
}
let urMom = new UrMom();
console.log("Ur mom weighs ", urMom.weight_pounds, " lbs.")

// 1. Javascript arrays
let chickens = ["Chicken Strips", "Chicken Nuggets", "Dino Nuggies", "Chicken Leg", "Chicken Wings", "Chicken Patty", "Chicken Sandwich", "Fried Chicken"]
console.log(chickens);
console.log(chickens[0]);
console.log(chickens[chickens.length - 1]);

let weirdo = ['d', "dfhdsgjsdh", 5, 0.01, chickens, {"chicken_strips":5.99, "chicken_nuggets":3.49}];
console.log(weirdo);

// 2. Javascript objects
let dict = {
    "e":1,
    ee:2,
    "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee":"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
};
console.log(dict);
console.log(dict.eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);


// 3. Array methods
// for (let i = 0; i < chickens.length; i++){
//     console.log(chickens[i]);
// }
// for (bob of chickens){
//     console.log(bob);
// }
chickens.forEach((bob) => console.log(bob));

// returns new mapped array
let chickens_dlskgjdsjj = chickens.map((bob) => bob + " dlskgjdsjj md bvjk dfnbjskgj sfhg  j");
console.log(chickens_dlskgjdsjj);

// returns new filtered array
let chickens_no_chicken = chickens.filter((bob) => {
    return !bob.toLowerCase().includes("chicken");
})
console.log(chickens_no_chicken);


