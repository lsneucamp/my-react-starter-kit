const axios = require('axios')
import AuthConstants from './AuthConstants.jsx'
import DefaultStore from './../commons/DefaultStore.jsx'


class AuthStore extends DefaultStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this))
        this._user = null
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case AuthConstants.GET_USER_INFO:
                this._user = action.payload
                break
            case AuthConstants.SIGN_OUT:
                this._user = null
                break
            default:
                break
        }
        this.emitChange()
    }

    getUser() {
        return this._user
    }

    isAuthenticated() {
        return this._user !== null
    }
}

export default new AuthStore();