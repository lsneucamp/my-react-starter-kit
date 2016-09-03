import AppConstants from '../constants/app-constants.jsx'
import {dispatcher,register} from '../dispatchers/app-dispatcher.jsx'

export default {
    someAction(item){
        dispatcher({actionType:AppConstants.TODO,item})
    }
}