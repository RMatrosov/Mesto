export default class FormValidator {
    constructor(props, validateElement) {
        this._inputSelector = props.inputSelector;
        this._submitButtonSelector = props.submitButtonSelector;
        this._inactiveButtonClass = props.inactiveButtonClass;
        this._inputErrorClass = props.inputErrorClass;
        this._errorClass = props.errorClass;
        this._validateElement = validateElement;
    }

    enableValidation() {
        this._validateElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    _setEventListeners() {
        this._inputList = Array.from(this._validateElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._validateElement.querySelector(this._submitButtonSelector);

        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    };

    _toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList)) {
            this._addBtnDisables(this._buttonElement);
        } else {
            this._removeBtnDisabled(this._buttonElement);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _addBtnDisables = () => {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);

    }

    _removeBtnDisabled = () => {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    }

    _isValid = (inputElement) => {

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError = (inputElement) => {
        const errorElement = this._validateElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._validateElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

}

const props = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

const editForm = document.querySelector('form[name="edit-profile"]');
const newCardForm = document.querySelector('form[name="new-card"]');

const EditForm = new FormValidator(props, editForm)
const FormNewCard = new FormValidator(props, newCardForm)
EditForm.enableValidation();
FormNewCard.enableValidation();



