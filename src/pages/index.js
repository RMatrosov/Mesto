import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
    addImageBtn, avatarBtn,
    editProfileBtn,
    elementsList, formBtn,
    jobInput,
    nameInput, newCardBtn,
    profileImgBtn,
    userData
} from "../utils/utils.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import PopupWithSubmit from "../components/PopupWithSubmit";

const userInfo = new UserInfo(userData);
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/',
    headers: {
        authorization: '4e299d77-1777-4738-8eea-94761855c603',
        'Content-Type': 'application/json'
    }
});

const getUserInfoPromise = api.getUserInfoFromServer();

const getInitialCardsPromise = api.getInitialCards();

Promise.all([getUserInfoPromise, getInitialCardsPromise])
    .then((results) => {
        userInfo.setUserInfo(results[0])
        cardList.renderItems(results[1].reverse());
    }).catch((err) => {
    console.log(err);
});

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const createCard = function (item) {
    const currentId = userInfo.getUserInfo().userId;
    const card = new Card(item, currentId, '.element_template', {
            handleCardClick: (evt) => {
                popupWithImage.open(evt.target.alt, evt.target.src);
            }
        },
        {
            addLike: (item, elem) => {
                api.addLike(item).then((result) => {
                    if (result) {
                        card.showLike(elem);
                    }
                })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        {
            deleteLike: (item, elem) => {
                api.deleteLike(item).then((result) => {
                    if (result) {
                        card.hideLike(elem);
                    }
                })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }, confirmationPopup)


    return card.generateCard();
}

const cardList = new Section({
    renderer: (item) => {
        addInArray(item)
    }

}, elementsList);

const addInArray = function (item) {
    const card = createCard(item)
    cardList.addItem(card);
}

const addCardPopup = new PopupWithForm('.popup_type_new-card', {
    formSubmit: (item) => {
        newCardBtn.textContent = 'Сохранить...'
        api.addCardToServer(item).then((result) => {
            addInArray(result)
            addCardPopup.close();
            newCardForm.addBtnDisables();

        })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
            newCardBtn.textContent = 'Сохранить'
        });
    }
});

addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_type_edit', {
    formSubmit: (item) => {
        formBtn.textContent = 'Сохранить...'
        api.setUserInfoFromServer(item).then((result) => {
            userInfo.setUserInfo(result);
            editProfilePopup.close();
            formBtn.textContent = 'Сохранить';
        })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
            formBtn.textContent = 'Сохранить'
        });
    }
})

editProfilePopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_type_avatar', {
    formSubmit: (item) => {
        avatarBtn.textContent = 'Сохранить...'
        api.changeAvatar(item).then((result) => {
            userInfo.setUserInfo(result);
            avatarPopup.close();
            avatarBtn.textContent = 'Сохранить'
        })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
            avatarBtn.textContent = 'Сохранить'
        });
    }
})

avatarPopup.setEventListeners();

const confirmationPopup = new PopupWithSubmit('.popup_type_confirmation', {
    submit: (cardId, card) => {
        api.deleteCardFromServer(cardId).then((result) => {
            if (result) {
                card.remove();
                confirmationPopup.close();
            }
        })
            .catch((err) => {
                console.log(err);
            });
    }
})

confirmationPopup.setEventListeners();

addImageBtn.addEventListener('click', () => addCardPopup.open());

profileImgBtn.addEventListener('click', () => {
    avatarForm.toggleButtonState();
    avatarPopup.open()
});

editProfileBtn.addEventListener('click', () => {
    editForm._inputList.forEach(input => editForm.isValid(input));
    editForm.toggleButtonState();
    editProfilePopup.open();
    const newUserInfo = userInfo.getUserInfo();
    nameInput.value = newUserInfo.name;
    jobInput.value = newUserInfo.job;
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
const avatarForm = new FormValidator(props, document.querySelector('form[name="change-avatar"]'));

editForm.enableValidation();
newCardForm.enableValidation();
avatarForm.enableValidation();






