export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._element = document.querySelector(this._popupSelector);
    };

    open() {
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    };

    setEventListeners() {
        const closeBtn = this._element.querySelector('.popup__button-close')
        closeBtn.addEventListener('click', () => {
            this.close();
        });
        this._element.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    };
};



