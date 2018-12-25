import React, { Component } from 'react'
import { Query, withApollo } from 'react-apollo'
import { GET_OVERVIEW } from '../../apollo/graphql.query'
const OverviewByType = (props) => {
  const title = props.title === 'today' ? 'Today' : props.title === 'thisMonth' ? 'This month' : 'Last month'
  return (
    <div className='ovw-itm'>
      <div className='title-ovw'>{title}</div>
      <div className='amount-ovw'>-{props.amount}$</div>
    </div>
  )
}
class QuickOverview extends Component {
  componentDidMount () {
  }
  render () {
    return (
      <div className='ovw'>
        <Query query={GET_OVERVIEW} variables={{ userId: window.localStorage.getItem('id') }}>
          {({ loading, error, data }) => {
            if (loading) return 'loading'
            if (error) return 'error'
            return Object.entries(data.overviews).slice(0, 3).map((ovw) => {
              return <OverviewByType key={ovw[0]} amount={ovw[1]} title={ovw[0]} />
            })
          }}
        </Query>
      </div>
    )
  }
}
export default withApollo(QuickOverview)
