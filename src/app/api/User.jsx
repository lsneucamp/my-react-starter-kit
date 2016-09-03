import axios from 'axios'
import {getCookie,clearCookie} from '../utils/cookie.jsx'


export default {
    getUserInfo() {
        return new Promise((resolve, reject) => {
            let jwt = {access_token: ''}
            const cookie = getCookie('token_key')
            if (cookie) {
                try {
                    console.log('atob(cookie)',cookie)
                    jwt = JSON.parse(atob(cookie))
                } catch (err) {
                    console.log('_get_user_info', err)
                    return reject('unable to parse token')
                }
            }

            let access_token = jwt.access_token

            if(!access_token){
                return reject('no token')
            }

            axios.get(`http://lucianos-imac.local:9999/user`, {
                params: {access_token}
            }).then((response)=> {
                console.log('_get_user_info_get_then', response)
                resolve(response.data)
            }).catch(function (response) {
                if (response.status === 401) {
                    clearCookie('token_key')
                }
                console.error('_get_user_info_get_catch', response)
                reject(response.status)
            })
        })

    },
    signOut() {
        clearCookie('token_key')
    }
}