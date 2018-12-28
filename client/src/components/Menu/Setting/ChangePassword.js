import React, { Component } from 'react'

class ChangePassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPwd: '',
      newPwd: '',
      reEtnerPwd: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (e) {
    console.log(e.target.id)
  }
  render () {
    return (
      <div className='changePwd'>
        <form >
          <label htmlFor='curpwd'>Current password: </label>
          <input id='curpwd' type='password' onChange={this.handleInputChange} /><br />
          <label htmlFor='newpwd'>New password: </label>
          <input id='newpwd' type='password' onChange={this.handleInputChange} /><br />
          <label htmlFor='renewpwd'>Re-enter new password: </label>
          <input id='renewpwd' type='password' onChange={this.handleInputChange} /><br />
          <button type='submit' >Change password</button>
        </form>
      </div>
    )
  }
}

export default ChangePassword
