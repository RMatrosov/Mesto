import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._element = document.querySelector(this._popupSelector);
        this._imagePopupTitle = this._element.querySelector('.popup__title');
        this._imagePopupImg = this._element.querySelector('.popup__img');
    }

    open(title, src) {
        this._imagePopupTitle.textContent = title;
        this._imagePopupImg.src = src;
        this._imagePopupImg.alt = title;
        super.open();
    }

    close(){
        super.close();
    };
};