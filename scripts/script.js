const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },

];

const redactBtn = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__button-close');
const newCardBtnClose = document.querySelector('#newCardBtnClose');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job');

const addImageBtn = document.querySelector('.profile__button-add');

const cardTitle = document.querySelector('#title');
const cardLink = document.querySelector('#link');
const newCardPopup = document.querySelector('.popup_type_new-card');

const elementsList = document.querySelector(".elements__list");
const elementTemplate = document.querySelector(".element_template").content;

const imagePopup = document.querySelector(".popup_type_image");
const bigImgCloseBtn = document.querySelector(".popup__button-close_type_image");
const bigImage = document.querySelector(".popup__img");
const imageTitle = document.querySelector(".popup__title");

function createCardFunk(evt) {
    evt.preventDefault();
    const newCard = {};
    if (cardTitle.value !== '' && cardLink.value !== '') {
        newCard.name = cardTitle.value;
        newCard.link = cardLink.value;
        renderItem(newCard)
    }
    popupClose()
}

function renderItem(item) {
    const htmlElement = elementTemplate.cloneNode(true);
    htmlElement.querySelector('.element__title').innerText = item.name;
    htmlElement.querySelector('.element__image').src = item.link;

    htmlElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    htmlElement.querySelector('.element__button-delete').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    })
    const element = htmlElement.querySelector('.element');
    const elementImg = element.querySelector('.element__image');
    const elementTitle = element.querySelector('.element__title');
    elementImg.addEventListener('click', () => {
        imageTitle.textContent = elementTitle.textContent;
        bigImage.src = elementImg.src;
        imagePopup.classList.add('popup_opened');
    })

    elementsList.prepend(htmlElement);

}

function renderItems() {
    initialCards.forEach(renderItem);
}

function popupOpen(evt) {
    if (evt.target.className === 'profile__button-add') {
        newCardPopup.classList.add('popup_opened');
    } else if (evt.target.className === 'profile__button') {
        popup.classList.add('popup_opened');
    }
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function popupClose() {

    newCardPopup.classList.remove('popup_opened');
    popup.classList.remove('popup_opened');
    imagePopup.classList.remove('popup_opened');
    cardTitle.value = '';
    cardLink.value = '';
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupClose()
}

redactBtn.addEventListener('click', popupOpen);
closeBtn.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);

addImageBtn.addEventListener('click', popupOpen);
newCardBtnClose.addEventListener('click', popupClose);
newCardPopup.addEventListener('submit', createCardFunk);

bigImgCloseBtn.addEventListener('click', popupClose);

renderItems()
