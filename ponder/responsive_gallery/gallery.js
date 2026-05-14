const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(e) {

    modal.showModal(); // it is not open because they are stupid

    // modalImage.setAttribute("src",e.target.src)
    // modalImage.setAttribute("alt",e.target.alt)

    
    let smallImageSrc = e.target.src;
    let fullImageSrc = smallImageSrc.replace("-sm.", "-full.");

    modalImage.src = fullImageSrc;
    modalImage.alt = e.target.alt;
    
}
// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});