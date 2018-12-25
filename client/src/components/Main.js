import React from 'react'
import Section from './Section'
import Expense from './Expense/Expense'
import QuickOverview from './Overview/QuickOverview'
import MAccounts from './Accounts/MAccounts'
const Main = (props) => {
  return (
    <div className='main'>
      <Section title='List of accounts'>
        <MAccounts />
      </Section>
      <Section title='Quick Overview'>
        <QuickOverview />
      </Section>
      <Section title='Last Records'>
        <Expense />
      </Section>
    </div>
  )
}

export default Main
