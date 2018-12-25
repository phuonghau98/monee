import React from 'react'
import { ExpenseConstants } from '../../ExpenseConstants'
const ExpanseDetail = (props) => {
  const type = ExpenseConstants[`${props.tag}`] || ''
  const payMethodColor = props.payMethod === 'cc' ? { color: '#DB5461' } : (props.payMethod === 'bank' ? { color: '#016FB9' } : { color: '#ED9B40' }) || ''
  const payMethod = props.payMethod === 'cc' ? 'Credit' : (props.payMethod === 'bank' ? 'Bank' : 'Cash') || ''
  const description = props.description[props.description.length - 1].content === '' ? 'No description' : props.description[props.description.length - 1].content
  return (
    <div className='expense-detail'>
      <div className='expense-icon icon'>{type.icon}</div>
      <div className='expense-name'>{type.name}</div>
      <div className='expense-time'>{props.date}</div>
      <div className='expense-paymethod' style={payMethodColor} >{payMethod}</div>
      <div className='expense-description' >{description}</div>
      <div className='expense-amount'>-{props.amount}$</div>
    </div>
  )
}
export default ExpanseDetail
