import React, { Component } from 'react'
import MAccount from './MAccount'
import { ACCOUNTS_SUBSCRIPTION } from '../../apollo/graphql.subscription'
class MAccountsWithData extends Component {
  componentWillMount () {
    this.userId = window.localStorage.getItem('id')
  }
  componentDidMount () {
    this.subscribeToNewAccounts()
  }
  subscribeToNewAccounts () {
    this.props.subscribeFunc({
      document: ACCOUNTS_SUBSCRIPTION,
      variables: { userId: this.userId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newAccounts = subscriptionData.data.accountsModified
        prev.user.accounts = newAccounts
        return prev
      }
    })
  }
  render () {
    const balanceArray = Object.entries(this.props.data.user.accounts).slice(0, 3)
    return (
      balanceArray.map(balance => {
        const title = balance[0] === 'cc' ? 'Credit' : (balance[0] === 'bank' ? 'Bank' : 'Cash')
        const code = balance[0]
        const balanceAmount = balance[1]
        return <MAccount key={code} code={code} title={title} cssClass={code} balance={balanceAmount} />
      })
    )
  }
}

export default MAccountsWithData
