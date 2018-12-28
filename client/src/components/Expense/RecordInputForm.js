import React, { Component } from 'react'
import { ExpenseConstants } from '../../ExpenseConstants'
import { withApollo } from 'react-apollo'
import { ADD_RECORD } from '../../apollo/graphq.mutate'
import { GET_OVERVIEW } from '../../apollo/graphql.query'
class RecordInputForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      amount: null
    }
  }
  componentWillMount () {
    this.userId = window.localStorage.getItem('id')
  }

  resetForm (...nodes) {
    nodes.forEach((node) => {
      node.value = null
    })
    this.setState({
      amount: null
    })
  }
  render () {
    const constsTag = Object.entries(ExpenseConstants)
    let method, description, tag, amount
    return (
      <form className='recordForm'>
        <div className='expense-detail input'>
          <div className='expense-icon icon' />
          <div className='expense-name input'>
            <select name='tag' ref={node => (tag = node)}>
              {constsTag.map((tag, id) => {
                return <option key={id} value={tag[0]}>{tag[1].name}</option>
              })}
            </select>
          </div>
          <div className='expense-time' />
          <div className='expense-paymethod input'>
            <select name='paymethod' ref={node => (method = node)}>
              <option value='bank'>Bank</option>
              <option value='cc'>Credit</option>
              <option value='cash'>Cash</option>
            </select>
          </div>
          <div className='expense-description input' >
            <textarea type='text' placeholder='Write descriptiton...' ref={node => (description = node)} />
          </div>
          <div className='expense-amount input'>
            <input type='number' ref={node => (amount = node)} min='0' onChange={(e) => {
              this.setState({
                amount: Number(e.target.value)
              })
            }} />
          </div>
          <button type='submit' className='submitBtn' onClick={(e) => {
            e.preventDefault()
            if (this.state.amount === null) {
              window.alert('Invalid Amount')
            } else {
              const mutationVariables = {
                belongsTo: this.userId,
                amount: this.state.amount,
                tag: tag.value,
                description: description.value,
                method: method.value
              }
              this.props.client.mutate({
                mutation: ADD_RECORD,
                variables: mutationVariables
              })
                .then(result => {
                  console.log(result)
                })
              const prevOverviews = this.props.client.readQuery({ query: GET_OVERVIEW, variables: { userId: this.userId } }).overviews || []
              const nextOverviews = { ...prevOverviews, today: prevOverviews.today + this.state.amount, thisMonth: prevOverviews.thisMonth + this.state.amount }
              this.props.client.writeQuery({ query: GET_OVERVIEW, variables: { userId: this.userId }, data: { overviews: nextOverviews } })
              this.resetForm(description, amount)
            }
          }}>Submit</button>
          <button className='cancelBtn' onClick={(e) => {
            e.preventDefault()
            this.props.closeRecordForm()
          }}>Cancel</button>
        </div>
      </form>
    )
  }
}
export default withApollo(RecordInputForm)
