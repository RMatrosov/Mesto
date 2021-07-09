
export default class Card {
    constructor(data, cardSelector, {handleCardClick}) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this.elementImg = this._element.querySelector('.element__image');

        this.elementImg.src = this._link;
        this.elementImg.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });
        this._element.querySelector('.element__button-delete').addEventListener('click', () => {
            this._removeCard();
        });
        this._element.querySelector('.element__image').addEventListener('click', (evt) => {
            this._handleCardClick(evt);
        });
    };

    _toggleLike(evt) {
        evt.target.classList.toggle('element__like_active');
    };

    _removeCard() {
        this._element.remove();
        this._element = null;
    };
};


