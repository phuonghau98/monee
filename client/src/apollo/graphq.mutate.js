import gql from 'graphql-tag'

export const MUTATE_ACCOUNTS = gql`
mutation modifyAccounts($id: String!, $code: String!, $amount: Float!, $isIncrease: Boolean){
  modifyAccounts(id: $id, code: $code, amount: $amount, isIncrease: $isIncrease){
    bank
    cash
    cc
    }
  }
`
export const ADD_USER = gql`
  mutation createUser($name: String!, $usn: String!, $pwd: String!){
    createUser(user: { name: $name, usn: $usn, pwd: $pwd }){
      id
      status
    }
  }
`
export const ADD_RECORD = gql`
mutation createRecord($belongsTo: ID!, $tag: String!, $method: String!, $description: String!, $amount: Float!){
  createRecord(record: {
    belongsTo: $belongsTo,
    tag: $tag,
    method: $method
    description: $description,
    amount: $amount
  }){
    id
    belongsTo
    tag
    date
    method
    description{
      date
      content
    }
    amount
  }
}
`
