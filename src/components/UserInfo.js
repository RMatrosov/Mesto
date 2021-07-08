export default class UserInfo {
    constructor(data) {
        this._name = data.name;
        this._info = data.job;
        this._profileName = document.querySelector(this._name);
        this._profileJob = document.querySelector(this._info);
    };

    setUserInfo(item) {
        this._profileName.textContent = item.name;
        this._profileJob.textContent = item.job;
    };

    getUserInfo() {
        return {
              name: this._profileName.textContent,
              job: this._profileJob.textContent
        };
    };
};