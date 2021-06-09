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
const editProfilePopup = document.querySelector('.popup_type_edit');
const closeBtn = document.querySelector('.popup__button-close');
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
const elementTemplate = document.querySelector(".element_template").content;
const imagePopup = document.querySelector(".popup_type_image");
const bigImgCloseBtn = document.querySelector(".popup__button-close_type_image");
const bigImage = document.querySelector(".popup__img");
const popupTypeImageTitle = document.querySelector(".popup__title");

function createCardFunk(evt) {
    evt.preventDefault();
    if (newCardTitleInput.value !== '' && newCardLinkInput.value !== '') {
        const newCard = {};
        newCard.name = newCardTitleInput.value;
        newCard.link = newCardLinkInput.value;
        renderItem(newCard);
    }
    closePopup();
}

function renderItem(item) {
    const htmlElement = elementTemplate.cloneNode(true);
    const element = htmlElement.querySelector('.element');
    const elementImg = element.querySelector('.element__image');
    const elementTitle = element.querySelector('.element__title');
    elementTitle.innerText = item.name;
    elementImg.src = item.link;
    htmlElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    htmlElement.querySelector('.element__button-delete').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    })
    elementImg.addEventListener('click', () => {
        popupTypeImageTitle.textContent = elementTitle.textContent;
        bigImage.src = elementImg.src;
        openPopup(imagePopup);
    })

    elementsList.prepend(htmlElement);
}


function renderItems() {
    initialCards.forEach(renderItem);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup() {
    const popupOpened = document.querySelector('.popup_opened');
    popupOpened.classList.remove('popup_opened');
}

function popupTypeEditHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

function handleOpenEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(editProfilePopup);
}

function handleOpenNewCardPopup() {
    openPopup(newCardPopup);
    document.querySelector('#form_new-card').reset()
}

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closePopup();
    }
});

const closePopupOverlay = () => {
    const popups = Array.from(document.querySelectorAll('.popup'));
    popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                closePopup();
            }
        });
    });
};

redactBtn.addEventListener('click', handleOpenEditProfilePopup);
closeBtn.addEventListener('click', closePopup);
editProfilePopup.addEventListener('submit', popupTypeEditHandler);
addImageBtn.addEventListener('click', handleOpenNewCardPopup);
newCardBtnClose.addEventListener('click', closePopup);
newCardPopup.addEventListener('submit', createCardFunk);
bigImgCloseBtn.addEventListener('click', closePopup);

renderItems();
closePopupOverlay()