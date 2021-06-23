import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {imagePopup} from "./utils.js";

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
const bigImgCloseBtn = document.querySelector(".popup__button-close_type_image");
const formNewCard = document.querySelector('#form_new-card');
const Escape = 'Escape';



function createCardFunk(evt) {
    evt.preventDefault();
    const newCard = {};
    newCard.name = newCardTitleInput.value;
    newCard.link = newCardLinkInput.value;
    renderCard(newCard);
    closePopup(newCardPopup);
    newCardForm.addBtnDisables();
}

function renderCard(htmlElement) {
    const card = new Card(htmlElement, '.element_template', openPopup)
    const cardElement = card.generateCard();
    elementsList.prepend(cardElement);

}

function renderItems() {
    initialCards.forEach(renderCard);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleOverlay);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleOverlay);
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
    formNewCard.reset();
}

function handleOverlay(evt) {
    if (evt.key === Escape) {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup)
    }
}

const closePopupOverlay = () => {
    const popups = Array.from(document.querySelectorAll('.popup'));
    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
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

const props = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};
const editForm = new FormValidator(props, document.querySelector('form[name="edit-profile"]'));
const newCardForm = new FormValidator(props, document.querySelector('form[name="new-card"]'));

editForm.enableValidation();
newCardForm.enableValidation();

closePopupOverlay();
renderItems();
