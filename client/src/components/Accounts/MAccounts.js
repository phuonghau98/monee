import React from 'react'
import { Query } from 'react-apollo'
import { GET_ACCOUNTS } from '../../apollo/graphql.query'
import MAccountsWithData from './MAccountsWithData'
const MAccounts = (props) => {
  return (
    <div className='account-section'>
      <Query query={GET_ACCOUNTS} variables={{ id: window.localStorage.getItem('id') }}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return 'Loading'
          if (error) return 'Error'
          return <MAccountsWithData data={data} subscribeFunc={subscribeToMore} />
        }}
      </Query>
    </div>
  )
}
export default MAccounts
