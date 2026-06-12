const characterObj = {
    name : "Duck The Wise",
    image : "images/DuckOfWisdomBig.png",
    race : "Duck",
    class : "Warlock",
    hp : 2,
    level : 999,
    updateCard : function() {
        document.querySelector(".name").textContent = this.name;
        document.querySelector(".image").src = this.image;

        document.querySelector(".race_field").innerHTML =  `<b>Race:</b> ${this.race}`;
        document.querySelector(".class_field").innerHTML =  `<b>Class:</b> ${this.class}`;
        document.querySelector(".hitpoints_field").innerHTML =  `<b>Hitpoints:</b> ${this.hp}`;
        document.querySelector(".level_field").innerHTML =  `<b>Level:</b> ${this.level}`;
    },
    takeDamage : function(amount = 1, displayDeath = true){
        if (this.hp === 0){
            return;
        }
        
        this.hp -= amount;
        if (this.hp < 0){
            this.hp = 0;
        }

        this.updateCard();

        if (this.hp === 0 && displayDeath){
            setTimeout(() => {window.alert(`${this.name} died.`)},500);
        }
    },
    increaseLevel : function(amount = 1){
        this.level += amount
        this.updateCard();
    },
    setImage : function(image = ""){
        this.image = image;
        this.updateCard();
    }
}

characterObj.updateCard();

const attackButton = document.querySelector(".attack_button");
const levelUpButton = document.querySelector(".level_up_button");

attackButton.addEventListener("click",event => {
    characterObj.takeDamage(1,false);

    if (characterObj.hp === 0){
        characterObj.setImage("images/DuckOfWisdomEvil.png");

        setTimeout(() => {
            window.alert("You provoked the Duck.");
            window.alert("Don't worry, it will be all over soon.");
            open("about:blank",'_self').close();
        }, 100);
        
        
    }
})

levelUpButton.addEventListener("click",event => {
    characterObj.increaseLevel(1);

    characterObj.setImage("images/DuckOfWisdomGood.png");

    setTimeout(() => {
        characterObj.setImage("images/DuckOfWisdomBig.png");
    },500);
})