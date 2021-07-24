import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, {submit}) {
        super(popupSelector)
        this._element = document.querySelector(this._popupSelector);
        this._submit = submit;
        this._form = this._element.querySelector('.form');
    }

    submitBtn(cardId, card) {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(cardId, card)
        })
    }

}