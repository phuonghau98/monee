import gql from 'graphql-tag'

export const RECORDS_SUBSCRIPTION = gql`
subscription{
  recordCreated{
    id
    tag
    date
    method
    amount
    description{
      content
      date
    }
  }
}
`

export const ACCOUNTS_SUBSCRIPTION = gql`
subscription accountsSubscription($userId: ID!){
  accountsModified(userId: $userId){
    bank
    cc
    cash
  }
}
`
