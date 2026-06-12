


let hp = 2;
let level = 999;

const duckImage = document.getElementById("duck_img");

const hitpointsField = document.getElementById("hitpoints_field");
const levelField = document.getElementById("level_field");

const attackButton = document.getElementById("attack_button");
const levelUpButton = document.getElementById("level_up_button");

attackButton.addEventListener("click",event => {
    if (hp === 0){
        return;
    }
        
    hp--;
    hitpointsField.innerHTML =`<b>Hitpoints:</b> ${hp}`;

    if (hp === 0){
        duckImage.src = "images/DuckOfWisdomEvil.png";
        setTimeout(() => {
            window.alert("You provoked the Duck.");
            window.alert("Don't worry, it will be all over soon.");
            open("about:blank",'_self').close();
        }, 100);
        
        
    }
})

levelUpButton.addEventListener("click",event => {
    level++;
    levelField.innerHTML = `<b>Level:</b> ${level}`;

    duckImage.src = "images/DuckOfWisdomGood.png";

    setTimeout(() => {
        duckImage.src = "images/DuckOfWisdomBig.png"
    },500);
})