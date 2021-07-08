import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {formSubmit}) {
        super(popupSelector)
        this._element = document.querySelector(this._popupSelector);
        this._formSubmit = formSubmit;
        this._formList = this._element.querySelector('.form');
    }

    _getInputValues() {
        const newCard = {};
        this._inputValue = this._formList.querySelectorAll('.form__input');
        this._inputValue.forEach((input) => {
            newCard[input.name] = input.value;
        })
        return newCard;
    }

    setEventListeners() {
        super.setEventListeners()
        this._getInputValues()
        this._formList.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues())
        })
    }

    close() {
        super.close();
        this._formList.reset();
    }
}