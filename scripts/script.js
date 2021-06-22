import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const editProfileBtn = document.querySelector('.profile__button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileBtnClose = document.querySelector('.popup__button-close');
const newCardBtnClose = document.querySelector('#newCardBtnClose');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const addImageBtn = document.querySelector('.profile__button-add');
const newCardTitleInput = document.querySelector('#title');
const newCardLinkInput = document.querySelector('#link');
const newCardPopup = document.querySelector('.popup_type_new-card');
const elementsList = document.querySelector(".elements__list");
export const imagePopup = document.querySelector(".popup_type_image");
const bigImgCloseBtn = document.querySelector(".popup__button-close_type_image");
export const bigImage = document.querySelector(".popup__img");
export const popupTypeImageTitle = document.querySelector(".popup__title");

function createCardFunk(evt) {
    evt.preventDefault();
    const formBtn = document.querySelector('#newCardSubmitBtn');
    const inactiveButtonClass = 'form__button_disabled';
    const newCard = {};
    newCard.name = newCardTitleInput.value;
    newCard.link = newCardLinkInput.value;
    renderCard(newCard);
    addBtnDisables(formBtn, inactiveButtonClass);
    closePopup(newCardPopup);
}

function addBtnDisables (btm, className){
    btm.classList.add(className);
    btm.setAttribute('disabled', true);

}

function renderCard(htmlElement) {
    let card = new Card(htmlElement, '.element_template')
    const cardElement = card.generateCard();
    elementsList.prepend(cardElement);

}

function renderItems() {
    initialCards.forEach(renderCard);
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleOverlay);
    closePopupOverlay();
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleOverlay);
}

function handlePopupTypeEdit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editProfilePopup);
}

function handleOpenEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(editProfilePopup);
}

function handleOpenNewCardPopup() {
    openPopup(newCardPopup);
    const formNewCard = document.querySelector('#form_new-card');
    formNewCard.reset();
}

function handleOverlay(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup)
    }
}

const closePopupOverlay = () => {
    const popups = Array.from(document.querySelectorAll('.popup'));
    popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                closePopup(popup);
            }
        });
    });
};

newCardPopup.addEventListener('submit', createCardFunk);
editProfilePopup.addEventListener('submit', handlePopupTypeEdit);
addImageBtn.addEventListener('click', handleOpenNewCardPopup);
editProfileBtn.addEventListener('click', handleOpenEditProfilePopup);
editProfileBtnClose.addEventListener('click', () => {
    closePopup(editProfilePopup);
});

newCardBtnClose.addEventListener('click', () => {
    closePopup(newCardPopup);
});

bigImgCloseBtn.addEventListener('click', () => {
    closePopup(imagePopup);
});

renderItems();
