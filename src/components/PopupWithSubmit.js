import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, {submit}) {
        super(popupSelector)
        this._submit = submit;
        this._form = this._element.querySelector('.form');
    };

    submitBtn(id, elem) {
        this.id = id;
        this.elem = elem;
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this.id, this.elem);
        });
    };
};