document.getElementById("rollButton").addEventListener("click", event => {

    //get the images
    const images = document.querySelectorAll("#gameboard img");
    //change the src

    images.forEach(image => {
        if (isDieUnlocked(image)){
            image.src = "assets/die_rolling.gif";
        }
    });

    // wait half a second, then call this
    setTimeout(() => {
        images.forEach(image => {
            if (isDieUnlocked(image)){
                let random = Math.random() * 6;
                if (random == 0){random = 1;}
                image.src = `assets/white_dice_${Math.ceil(random)}.gif`;
            }
        })
    }, 500)
})

function isDieUnlocked(dieImage) {
    // retrieve list of checkboxes
    const checkboxes = document.querySelectorAll("#gameboard input");
    // filter out checked
    const unchecked = Array.from(checkboxes).filter(checkbox => !checkbox.checked);
    // compare list to dieImage, if there's a match, return
    return unchecked.find(unchecked => unchecked.className === dieImage.className);
}