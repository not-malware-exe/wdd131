let menuButton = document.querySelector(".menu-btn");

menuButton.addEventListener("click", chickenStrips);

function chickenStrips(iLikeCheese){ 
    console.log(iLikeCheese); // prints the event

    // toggle da menu
    let navs = document.querySelectorAll("nav");

    for (const nav of navs){
        nav.classList.toggle("unhide");
    }
}

