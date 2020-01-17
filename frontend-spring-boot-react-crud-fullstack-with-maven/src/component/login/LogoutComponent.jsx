import React, { Component } from 'react'
import LoginComponent from './LoginComponent'

class LogoutComponent extends Component {

    render() {

        return (

            <>
                <LoginComponent logout={true}/>
            </>
        )
    }
}
export default LogoutComponent
