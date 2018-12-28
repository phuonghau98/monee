import React, { Component } from 'react'
import { ADD_USER } from '../../apollo/graphq.mutate'
import { withApollo } from 'react-apollo'
class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSigningUp: false,
      errMessage: '',
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
    this.props.client.mutate({
      mutation: ADD_USER,
      variables: {
        name: this.nameNode.value,
        usn: this.usnNode.value,
        pwd: this.pwdNode.value
      }
    })
      .then((res) => {
        this.setState({
          isSuccessful: true,
          isSigningUp: false
        })
        setTimeout(this.props.toLogin, 2000)
      })
      .catch(error => {
        this.setState({
          errMessage: error.graphQLErrors[0].message.message,
          isSigningUp: false
        })
      })
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSignUpSubmit}>
          <button className='backToLogin' onClick={this.props.toLogin}><i className='fas fa-caret-square-left' /> Back to login</button>
          <div className='login-title'>SIGN UP</div>
          <label htmlFor='SignName' style={{ textAlign: 'initial' }}>Name</label>
          <input ref={node => (this.nameNode = node)} autoComplete='off' type='text' autoCorrect='off' id='SignName' maxLength={20} /><br />
          <label htmlFor='usn' style={{ textAlign: 'initial' }}>Username</label>
          <input ref={node => (this.usnNode = node)} id='SignUsername' autoComplete='off' type='text' spellCheck='false' autoCorrect='off' maxLength={20} /><br />
          <label htmlFor='SignPassword'>Password</label>
          <input ref={node => (this.pwdNode = node)} autoComplete='off' autoCorrect='off' type='password' id='SignPassword' maxLength={20} /><br />
          {this.state.errMessage !== '' && <p className='notify invalid'>{this.state.errMessage}</p>}
          {this.state.isSuccessful && <p className='notify success'>Welcome to MONEE! Redirecting to login...</p>}
          <button type='submit' className='login-btn'>{this.state.isSigningUp ? <span><i className='fas fa-circle-notch fa-spin' /> Signing up</span> : 'Sign up' }</button>
        </form>
        <p style={{ color: 'purple' }} >By registering an account means that you have agreed with our policies</p>
      </div>
    )
  }
}

export default withApollo(SignUpForm)
