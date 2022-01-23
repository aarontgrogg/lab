import React from "react"

import Header from "./Header"
import {UserContextConsumer} from "./userContext"

export default class App extends React.Component {
    state = {
        username: ''
    }
    inputChange = e => {
        const {name, value} = e.target
        console.log(name, value)
        this.setState({[name]: value})
    }
    render() {
        return (
            <div>
                <Header />
                    <UserContextConsumer>
                        {({username, changeUsername}) => (
                            <main>
                                <p className="main">No new notifications, {username}! 🎉</p>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="New username"
                                    value={this.state.username}
                                    onChange={this.inputChange}
                                />
                                <button onClick={() => changeUsername(this.state.username)}>Change Username</button>
                            </main>
                        )}
                    </UserContextConsumer>
                
            </div>
        )
    }
}