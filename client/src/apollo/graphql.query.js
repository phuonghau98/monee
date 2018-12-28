import gql from 'graphql-tag'
export const GET_ACCOUNTS = gql`
query getUser($id: String!){
  user: getUser(id: $id){
    accounts{
      bank
      cc
      cash
    }
  }
}
`
export const GET_RECORDS = gql`
query getRecords($userId: ID!){
  records: getRecordByUserId(userId: $userId){
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

export const GET_OVERVIEW = gql`
  query overviews($userId: ID!){
    overviews: recordsStaticByDate(userId: $userId){
      today
      thisMonth
      lastMonth
    }
  }
`

export const GET_AUTHENTICATION = gql`
  query login($usn: String!, $pwd: String!){
    authentication: login(logInfo: {usn: $usn, pwd: $pwd }){
      token
      id
    }
  }
`
