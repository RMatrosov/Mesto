const setEventListeners = (formElement, props) => {
    const inputList = Array.from(formElement.querySelectorAll(props.inputSelector));
    const buttonElement = formElement.querySelector(props.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, props);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, props);
            toggleButtonState(inputList, buttonElement, props);
        });
    });
};

const isValid = (formElement, inputElement, props) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, props);
    } else {
        hideInputError(formElement, inputElement, props);
    }
};

const showInputError = (formElement, inputElement, errorMessage, props) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(props.inputErrorClass);
    errorElement.classList.add(props.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, props) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(props.inputErrorClass);
    errorElement.classList.remove(props.errorClass);
    errorElement.textContent = '';
};

const enableValidation = (props) => {
    const formList = Array.from(document.querySelectorAll(props.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, props);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, props) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(props.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true)
    } else {
        buttonElement.classList.remove(props.inactiveButtonClass);
        buttonElement.removeAttribute('disabled')
    }
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
})


