export default class Api {
    constructor({baseUrl, headers}) {
        this._URL = baseUrl;
        this._token = headers.authorization;
    };

    getInitialCards() {
        return fetch(`${this._URL}cards`, {
            headers: {
                authorization: this._token,
            }
        })
            .then(this._handleResponse);
    };

    getUserInfoFromServer() {
        return fetch(`${this._URL}users/me`, {
            headers: {
                authorization: this._token,
            }
        })
            .then(this._handleResponse);
    };

    setUserInfoFromServer(data) {
        return fetch(`${this._URL}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.job
            })
        })
            .then(this._handleResponse);
    };

    addCardToServer(item) {
        return fetch(`${this._URL}cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })
        })
            .then(this._handleResponse);
    };

    deleteCardFromServer(data) {
        return fetch(`${this._URL}cards/${data}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._handleResponse);
    };

    addLike(data) {
        return fetch(`${this._URL}cards/likes/${data}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._handleResponse);
    };

    deleteLike(data) {
        return fetch(`${this._URL}cards/likes/${data}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._handleResponse);
    };

    changeAvatar(item) {
        return fetch(`${this._URL}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: item.link,
            })
        })
            .then(this._handleResponse);
    };

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };
};