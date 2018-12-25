import React, { Component } from 'react'
import { ADD_USER } from '../../apollo/graphq.mutate'
import { withApollo } from 'react-apollo'
class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSigningUp: false,
      isInvalidSignUp: false,
      isSuccessful: false
    }
    this.usnNode = ''
    this.pwdNode = ''
    this.nameNode = ''
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this)
  }

  componentDidMount () {
    document.title = 'SIGN UP | MONEE'
    document.querySelector('#SignName').focus()
  }

  handleSignUpSubmit (e) {
    e.preventDefault()
    this.setState({
      isSigningUp: true,
      isInvalidUser: false
    })
    console.log(this.nameNode.value, this.pwdNode.value, this.usnNode.value)
    this.props.client.mutate({
      mutation: ADD_USER,
      variables: {
        name: this.nameNode.value,
        usn: this.usnNode.value,
        pwd: this.pwdNode.value
      }
    })
      .then((res) => {
        const createdInfo = res.data.createUser
        if (createdInfo.status === 203) {
          this.setState({
            isSuccessful: true,
            isSigningUp: false
          })
          setTimeout(this.props.toLogin, 2000)
        } else {
          this.setState({
            isInvalidSignUp: true,
            isSigningUp: false
          })
        }
      })
      .catch(error => console.log(error))
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSignUpSubmit}>
          <button className='backToLogin' onClick={this.props.toLogin}><i class='fas fa-caret-square-left' /> Back to login</button>
          <div className='login-title'>SIGN UP</div>
          <label htmlFor='SignName' style={{ textAlign: 'initial' }}>Name</label>
          <input ref={node => (this.nameNode = node)} autoComplete='off' type='text' autoCorrect='off' id='SignName' maxLength={20} /><br />
          <label htmlFor='usn' style={{ textAlign: 'initial' }}>Username</label>
          <input ref={node => (this.usnNode = node)} id='SignUsername' autoComplete='off' type='text' spellCheck='false' autoCorrect='off' maxLength={20} /><br />
          <label htmlFor='SignPassword'>Password</label>
          <input ref={node => (this.pwdNode = node)} autoComplete='off' autoCorrect='off' type='password' id='SignPassword' maxLength={20} /><br />
          {this.state.isInvalidSignUp && <p className='notify invalid'>Your information is invalid</p>}
          {this.state.isSuccessful && <p className='notify success'>Welcome to MONEE! <br>Redirecting to login...</br></p>}
          <button type='submit' className='login-btn'>{this.state.isSigningUp ? <span><i className='fas fa-circle-notch fa-spin' /> Signing up</span> : 'Sign up' }</button>
        </form>
        <p style={{ color: 'purple' }} >By registering an account means that you have agreed with our policies</p>
      </div>
    )
  }
}

export default withApollo(SignUpForm)
