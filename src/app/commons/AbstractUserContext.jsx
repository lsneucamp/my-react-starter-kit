import React from 'react'
import AuthStore from './../auth/AuthStore.jsx'


export default (ComposedComponent) => {
    return class AuthenticatedComponent extends React.Component {

        constructor() {
            super()
            this.state = this._getUserState();
        }

        _getUserState() {
            return {
                user: AuthStore.getUser(),
                isAuthenticated : AuthStore.isAuthenticated()
            };
        }

        // Here, we’re subscribing to changes in the LoginStore we created before. Remember that the LoginStore is an EventEmmiter.
        componentDidMount() {
            AuthStore.addChangeListener(this._onChange.bind(this));
        }

        // After any change, we update the component’s state so that it’s rendered again.
        _onChange() {
            this.setState(this._getUserState());
        }

        componentWillUnmount() {
            AuthStore.removeChangeListener(this._onChange.bind(this));
        }

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    user={this.state.user}
                    isAuthenticated={this.state.isAuthenticated} />
            );
        }
    }
}