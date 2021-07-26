import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, {submit}) {
        super(popupSelector)
        this._submit = submit;
        this._form = this._element.querySelector('.form');
    };

    open(id, elem) {
        super.open();
        this.id = id;
        this.elem = elem;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this.id, this.elem);
        });
    };
};