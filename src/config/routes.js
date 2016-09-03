import React from 'react'
import Main from '../app/components/Main.jsx'
import Welcome from '../app/components/Welcome.jsx'
import NotFound from '../app/components/NotFound.jsx'
import DisplayUserInfo from '../app/components/DisplayUserInfo.jsx'
import {Route,IndexRoute} from 'react-router'
import AuthActions from '../app/auth/AuthActions.jsx'

// Auth middleware
const requireAuth = (nextState,replace,done)=> {
    AuthActions.getUser().then((user) => {
        done()
    }).catch((err)=>{
        done()
        window.location.href = `/login?path=${nextState.location.pathname}&query=${encodeURIComponent(nextState.location.search)}`;
    })

}

export default (
    <Route path="/" component={Main}>
        <IndexRoute component={Welcome}/>
        <Route path="profile" component={DisplayUserInfo} onEnter={requireAuth}/>
        <Route path="*" component={NotFound}/>
    </Route>
)