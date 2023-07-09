const modal = document.querySelector('#modal-background');
const modalCloseButton = document.querySelector('#modal_close-btn');
const infoButtons = [
    ...document.querySelectorAll('.info-btn'),
    document.querySelector('#hero_info_btn')
];
export function addModalEventListeners() {
    infoButtons.forEach(button => {
        if (button != null)
            button.addEventListener('click', displayModal);
    });
    if (modalCloseButton != null)
        modalCloseButton.addEventListener('click', hideModal);
}
const handleEsc = (e) => {
    if (e.key === 'Escape') {
        hideModal();
        document.removeEventListener('keydown', handleEsc);
    }
};
const displayModal = () => {
    if (modal != null) {
        modal.classList.remove('hidden');
        modal.classList.add('displayed');
        document.addEventListener('keydown', handleEsc);
    }
};
const hideModal = () => {
    if (modal != null) {
        modal.classList.remove('displayed');
        modal.classList.add('hidden');
    }
};
