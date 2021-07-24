export default class Card {
    constructor(data, userId, cardSelector, {handleCardClick}, {addLike}, {deleteLike}, confirmationPopup) {
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._cardId = data._id;
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this.likeCounter = data.likes.length
        this.addLike = addLike;
        this.deleteLike = deleteLike;
        this.dataLikes = data.likes;
        this.confirmationPopup = confirmationPopup;
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
        this.elementImg.id = this._cardId;
        this.elementImg.src = this._link;
        this.elementImg.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__like-counter').textContent = this.likeCounter;
        if (this._ownerId !== this._userId) {
            this._element.querySelector('.element__button-delete').remove()
        }
        this._isLiked(this.dataLikes)
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            if (this._element.querySelector('.element__like').classList.contains('element__like_active')) {
                this.deleteLike(this._cardId, this._element)
                /*this._hideLike(evt);*/
            } else {
                /*this._showLike(evt);*/
                this.addLike(this._cardId, this._element)
            }
        });
        this._element.querySelector('.element__button-delete').addEventListener('click', () => {
            this.confirmationPopup.open();
            this.confirmationPopup.submitBtn(this.elementImg.id, this._element)
        });
        this._element.querySelector('.element__image').addEventListener('click', (evt) => {
            this._handleCardClick(evt);
        });
    };


    hideLike(elem) {
        /*evt.target.classList.toggle('element__like_active');*/
        elem.querySelector('.element__like-counter').textContent--;
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    };

    showLike(elem) {
       /* evt.target.classList.toggle('element__like_active');*/
        elem.querySelector('.element__like-counter').textContent++;
        elem.querySelector('.element__like').classList.toggle('element__like_active');
    };

    _isLiked(likes) {
        likes.forEach(like => {
            if (like._id === this._userId) {
                this._element.querySelector('.element__like').classList.add('element__like_active');
            };
        });
    };


};


