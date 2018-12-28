import React, { Component } from 'react'
import { ACCOUNT_TYPE_COLOR } from '../constants'
import { MUTATE_ACCOUNTS } from '../../apollo/graphq.mutate'
import { withApollo } from 'react-apollo'
class UpdownModal extends Component {
  constructor (props) {
    super(props)
    this.init = true
    this.handleClickOutSide = this.handleClickOutSide.bind(this)
  }
  componentWillMount () {
    window.addEventListener('click', this.handleClickOutSide)
    this.userId = window.localStorage.getItem('id')
  }
  componentWillUnmount () {
    window.removeEventListener('click', this.handleClickOutSide)
  }

  handleClickOutSide (e) {
    if (!this.modal.contains(e.target) && !this.init) {
      this.props.closeModalFunc()
    }
    this.init = false
  }

  render () {
    const modalStyle = {
      background: ACCOUNT_TYPE_COLOR[this.props.code]
    }
    const ArrowStyle = {
      borderBottomColor: ACCOUNT_TYPE_COLOR[this.props.code]
    }
    let amountNode
    let incNode
    return (
      <div style={modalStyle} ref={node => (this.modal = node)} className='input-updown'>
        <div className='arrow-up' style={ArrowStyle} />
        <form>
          <input type='radio' ref={node => (incNode = node)} name='adjust' value='up' defaultChecked /> Increase
          <input type='radio' name='adjust' value='down' /> Decrease<br />
          <input type='number' ref={node => (amountNode = node)} placeholder='Amount...' />
          <button onClick={(e) => {
            e.preventDefault()
            this.props.closeModalFunc()
          }}>Cancel</button>
          <button onClick={(e) => {
            e.preventDefault()
            this.props.client.mutate({
              mutation: MUTATE_ACCOUNTS,
              variables: { id: this.userId, code: this.props.code, amount: Number(amountNode.value), isIncrease: incNode.checked }
            })
          }}>Submit</button>
        </form>
      </div>
    )
  }
}
export default withApollo(UpdownModal)
