"use strict";
const infoButtons = document.querySelectorAll('.info-btn');
const modal = document.querySelector('#modal-background');
console.log(modal);
const modalCloseButton = document.querySelector('#modal_close-btn');
const displayModal = () => {
    if (modal != null) {
        modal.classList.remove('hidden');
        modal.classList.add('displayed');
    }
};
const hideModal = () => {
    if (modal != null) {
        modal.classList.remove('displayed');
        modal.classList.add('hidden');
    }
};
infoButtons.forEach(button => {
    button.addEventListener('click', displayModal);
});
if (modalCloseButton != null)
    modalCloseButton.addEventListener('click', hideModal);
