import React, { Component } from 'react'
import request from 'superagent'

export default class TodoAppLogin extends Component {

    state = { 
                usernameSignIn: '',
                usernameSignUp: '',
                passwordSignIn: '',
                passwordSignUp: '',
            }

            handleSignIn = async() => {
                const signIn = await request.post(`https://nameless-brushlands-64319.herokuapp.com/api/auth/signin`, {
                    email: this.state.usernameSignIn,
                    hash: this.state.passwordSignIn,
                })
                localStorage.setItem('user', JSON.stringify(signIn.body));

            }
            handleSignUp = async() => {
                const signUp = await request.post(`https://nameless-brushlands-64319.herokuapp.com/api/auth/signup`, {
                    email: this.state.usernameSignUp,
                    hash: this.state.passwordSignUp,
                })
                localStorage.setItem('user', JSON.stringify(signUp.body));
            }


    render() {
        return (
            <div> 
                Login Page
                <br/>
                <input value={this.state.usernameSignUp} onChange={ (e) => this.setState({ usernameSignUp: e.target.value})} />
                <input value={this.state.passwordSignUp} onChange={ (e) => this.setState({ passwordSignUp: e.target.value})} />
                <button onClick={this.handleSignUp}>Sign Up</button>
                <br/>
                <br/>
                <input value={this.state.usernameSignIn} onChange={ (e) => this.setState({ usernameSignIn: e.target.value})} />
                <input value={this.state.passwordSignIn} onChange={ (e) => this.setState({ passwordSignIn: e.target.value})} />
                <button onClick={this.handleSignIn}>Sign In</button>
            </div>
        )
    }
}
