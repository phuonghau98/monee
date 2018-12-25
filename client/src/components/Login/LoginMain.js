import React, { Component } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSignUp: false
    }
  }

  render () {
    return (
      <div className='login-wrapper'>
        <div className='login-board'>
          { this.state.isSignUp
            ? <SignUpForm toLogin={() => this.setState({ isSignUp: false })} />
            : <LoginForm toSignUp={() => this.setState({ isSignUp: true })} />
          }
        </div>
      </div>
    )
  }
}

export default Login
