import React, { Component } from 'react'
import { ExpenseDes } from './ExpenseDetailDes'
import AddRecordButton from './AddRecordButton'
import RecordInputForm from './RecordInputForm'
import { Query } from 'react-apollo'
import { GET_RECORDS } from '../../apollo/graphql.query'
import RecordRows from './RecordRows'
class Expense extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openRecordForm: false
    }
  }
  closeRecordForm () {
    this.setState({
      openRecordForm: false
    })
  }
  toggleRecordForm () {
    this.setState(prevState => ({
      openRecordForm: !prevState.openRecordForm
    }))
  }

  render () {
    return (
      <div className='expense'>
        <AddRecordButton toggleRecordForm={this.toggleRecordForm.bind(this)} />
        <ExpenseDes />
        { this.state.openRecordForm && <RecordInputForm closeRecordForm={this.closeRecordForm.bind(this)} /> }
        <Query query={GET_RECORDS} variables={{ userId: window.localStorage.getItem('id') }} >
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return 'Loading'
            if (error) return 'Error'
            return <RecordRows data={data} subscribeFunc={subscribeToMore} />
          }}
        </Query>
      </div>
    )
  }
}
export default (Expense)
