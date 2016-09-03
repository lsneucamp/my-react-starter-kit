import React from 'react'
import AbstractUserContext from '../commons/AbstractUserContext.jsx'
import AuthActions from '../auth/AuthActions.jsx'


export default AbstractUserContext(
    class DisplayUserInfo extends React.Component {

        constructor(props) {
            super(props)
        }

        render() {
            var user = (!!this.props.user&&!!this.props.user.email)?this.props.user.email:"Err...."
            console.log('props', user)
            return <div>Authenticated {user}</div>
        }
    });
