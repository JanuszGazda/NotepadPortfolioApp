import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';

class NavBarComponent extends Component {

    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="navbar-brand mx-auto" >NotepadApp</div>
                    <ul className="navbar-nav">
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}
export default withRouter(NavBarComponent)
