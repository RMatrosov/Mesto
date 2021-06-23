import {bigImage, imagePopup, popupTypeImageTitle} from "../scripts/utils.js";


export default class Card {
    constructor(data, cardSelector, openPopup) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openPopup = openPopup;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const elementImg = this._element.querySelector('.element__image');

        elementImg.src = this._link;
        elementImg.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });
        this._element.querySelector('.element__button-delete').addEventListener('click', (evt) => {
            this._removeCard();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._showBigImg();
        });
    };

    _toggleLike(evt) {
        evt.target.classList.toggle('element__like_active');
    };

    _removeCard() {
        this._element.remove();
        this._element = null;
    };

    _showBigImg() {
        popupTypeImageTitle.textContent = this._name;
        bigImage.src = this._link;
        bigImage.alt = this._name;
        this._openPopup(imagePopup);
    }

};


