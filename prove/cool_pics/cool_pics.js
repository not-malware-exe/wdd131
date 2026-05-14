// Menu ///////////////////////////////////////////////////////////////

const menuButton = document.querySelector("#menu_button");
const nav = document.querySelector("nav");

menuButton.addEventListener("click",toggleMenu);

function toggleMenu(event){
    nav.classList.toggle("nav_unhide");
}

// Modal //////////////////////////////////////////////////////////////

const galleryPhotos = document.querySelectorAll(".gallery_photo");
const modal = document.querySelector("dialog");
const modalImg = modal.querySelector("img")
const closeModalButton = modal.querySelector(".close_modal_btn");

for (galleryPhoto of galleryPhotos){
    galleryPhoto.addEventListener("click",openModal);
}

closeModalButton.addEventListener("click",closeModalWithBtn);
modal.addEventListener("click",closeModalWithOverlay);
document.addEventListener("keydown",closeModalWithKey)

function openModal(event){
    modal.showModal();

    modalImg.src = event.target.src;
    modalImg.alt = event.target.alt;

}

function closeModalWithBtn(event){
    modal.close();
}

function closeModalWithOverlay(event){
    if (event.target === modal)
        modal.close();
}


function closeModalWithKey(event){
    if (event.key === "Escape")
        modal.close();
}