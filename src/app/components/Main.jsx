import React from 'react'


class Main extends React.Component {
    constructor() {
        super()
    }

    render(){
        return (
            <div className="main-container">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">lsnbox.co</a>
                        </div>
                        <p className="navbar-text">Luciano Neucamp React+Flux Starter Kit </p>
                    </div>
                </nav>
                <div className="container-fluid no-padding" >
                    {this.props.children}
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}

export default Main