const redactBtn = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job');

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function popupClose(evt) {
    evt.preventDefault();
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupClose(evt)
}

redactBtn.addEventListener('click', popupOpen);
closeBtn.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);


