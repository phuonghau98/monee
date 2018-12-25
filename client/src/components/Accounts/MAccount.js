import React, { Component } from 'react'
import UpdownModal from './UpdownModal'
class MAccount extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpenAdjustModal: false
    }
  }
  closeModal () {
    this.setState({
      isOpenAdjustModal: false
    })
  }
  render () {
    return (
      <div className={`m-account ${this.props.cssClass}`}>
        <div className='m-account-type'>{this.props.title}</div>
        <div className='m-account-balance'>{this.props.balance}$</div>
        <button className='m-account-edit' onClick={() => this.setState({ isOpenAdjustModal: true })} ><i className='fas fa-edit edit' /></button>
        {this.state.isOpenAdjustModal && <UpdownModal closeModalFunc={this.closeModal.bind(this)} code={this.props.code} />}
      </div>
    )
  }
}

export default MAccount
