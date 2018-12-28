import React from 'react'
import { withApollo } from 'react-apollo'
import { ExpenseConstants } from '../../ExpenseConstants'
import { DELETE_RECORD } from '../../apollo/graphq.mutate'
import { GET_RECORDS } from '../../apollo/graphql.query'
const ExpanseDetail = (props) => {
  const type = ExpenseConstants[`${props.tag}`] || ''
  const payMethodColor = props.payMethod === 'cc' ? { color: '#DB5461' } : (props.payMethod === 'bank' ? { color: '#016FB9' } : { color: '#ED9B40' }) || ''
  const payMethod = props.payMethod === 'cc' ? 'Credit' : (props.payMethod === 'bank' ? 'Bank' : 'Cash') || ''
  const description = props.description[props.description.length - 1].content === '' ? 'No description' : props.description[props.description.length - 1].content
  return (
    <div className='expense-detail'>
      <div className='expense-delete'><i className='far fa-trash-alt' onClick={() => {
        props.client.mutate({
          mutation: DELETE_RECORD,
          variables: { recordId: props.recordId }
        })
        const currentRecords = props.client.readQuery({ query: GET_RECORDS, variables: { userId: window.localStorage.getItem('id') } }) || []
        props.client.writeQuery({ query: GET_RECORDS, variables: { userId: window.localStorage.getItem('id') }, data: { records: currentRecords.records.filter((record) => record.id !== props.recordId) } })
      }
      } /></div>
      <div className='expense-icon icon'>{type.icon}</div>
      <div className='expense-name'>{type.name}</div>
      <div className='expense-time'>{props.date}</div>
      <div className='expense-paymethod' style={payMethodColor} >{payMethod}</div>
      <div className='expense-description' >{description}</div>
      <div className='expense-amount'>-{props.amount}$</div>
    </div>
  )
}
export default withApollo(ExpanseDetail)
