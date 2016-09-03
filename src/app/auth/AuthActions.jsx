import AuthConstants from './AuthConstants.jsx'
import {dispatcher,register} from '../dispatchers/app-dispatcher.jsx'
import User from '../api/User.jsx'


export default {
    getUser(){
        return new Promise((resolve,reject)=>{
            User.getUserInfo().then((payload) => {
                resolve(payload)
                dispatcher({actionType:AuthConstants.GET_USER_INFO,payload})
            }).catch((err) => {
                reject(err)
                dispatcher({actionType:AuthConstants.SIGN_OUT})
            })
        })
    },
    isAuthenticated(){
        dispatcher({actionType:AuthConstants.IS_AUTHENTICATED})
    },
    signOut(){
        User.signOut()
        dispatcher({actionType:AuthConstants.SIGN_OUT})
    }
}