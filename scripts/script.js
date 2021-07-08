import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
    addImageBtn,
    editProfileBtn,
    elementsList,
    initialCards,
    jobInput,
    nameInput, popupImgData,
    userData
} from "../utils/utils.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '.element_template', {
            handleCardClick: (evt) => {
                const popupWithImage = new PopupWithImage('.popup_type_image')
                popupWithImage.setEventListeners()
                popupWithImage.open(evt.target.alt, evt.target.src);
            }
        });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, elementsList);

const addCardPopup = new PopupWithForm('.popup_type_new-card', {
    formSubmit: (item) => {
        const card = new Card(item, '.element_template', {
            handleCardClick: (evt) => {
                const popupWithImage = new PopupWithImage('.popup_type_image')
                popupWithImage.setEventListeners()
                popupWithImage.open(evt.target.alt, evt.target.src);
            }
        });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
        addCardPopup.close();
        newCardForm.addBtnDisables();
    }
});

addCardPopup.setEventListeners();

const userInfo = new UserInfo(userData);

const editProfilePopup = new PopupWithForm('.popup_type_edit', {
    formSubmit: (item) => {
        userInfo.setUserInfo(item);
        editProfilePopup.close();
    }
})

editProfilePopup.setEventListeners();

addImageBtn.addEventListener('click', () => addCardPopup.open());

editProfileBtn.addEventListener('click', () => {
    editProfilePopup.open();
    const newUserInfo = userInfo.getUserInfo();
    nameInput.value = newUserInfo.name;
    jobInput.value = newUserInfo.job;
});

cardList.renderItems();

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

