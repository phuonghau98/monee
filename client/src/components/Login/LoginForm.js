import React, { Component } from 'react'
import { GET_AUTHENTICATION } from '../../apollo/graphql.query'
import { withApollo } from 'react-apollo'
class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogging: false,
      errMessage: ''
    }
    this.usnNode = ''
    this.pwdNode = ''
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    document.title = 'LOG IN | MONEE'
    document.querySelector('#logUsername').focus()
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({
      isLogging: true,
      isInvalidUser: false
    })
    this.props.client.query({
      query: GET_AUTHENTICATION,
      variables: {
        usn: this.usnNode.value,
        pwd: this.pwdNode.value
      }
    }).then(async (res) => {
      const authInfo = res.data.authentication
      this.setState({ isLogging: false })
      window.localStorage.setItem('token', authInfo.token)
      window.localStorage.setItem('id', authInfo.id)
      window.location.href = ''
    }).catch((error) => {
      this.setState({
        errMessage: error.graphQLErrors[0].message.message,
        isLogging: false
      })
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='login-title'>LOGIN</div>
          <label htmlFor='usn' style={{ textAlign: 'initial' }}>Username</label>
          <input ref={node => (this.usnNode = node)} id='logUsername' autoComplete='off' type='text' spellCheck='false' autoCorrect='off' maxLength={20} /><br />
          <label htmlFor='pwd'>Password</label>
          <input ref={node => (this.pwdNode = node)} id='logPassword' autoComplete='off' autoCorrect='off' spellCheck='false  ' type='password' maxLength={20} /><br />
          {this.state.isInvalidUser !== '' ? <p className='notify invalid'>{this.state.errMessage}</p> : null}
          <button type='submit' className='login-btn'>{this.state.isLogging ? <span><i className='fas fa-circle-notch fa-spin' /> Logging in</span> : 'Log in' }</button>
        </form>
        <button style={{ color: 'blue' }} onClick={this.props.toSignUp} >Haven't account yet? Register now!</button>
      </div>
    )
  }
}
export default withApollo(LoginForm)
