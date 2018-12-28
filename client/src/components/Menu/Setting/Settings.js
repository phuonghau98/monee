import React, { Component } from 'react'
import Section from '../../Section'
import MainWrapper from '../../MainWrapper'
import ChangePassword from './ChangePassword'
class Settings extends Component {
  render () {
    return (
      <MainWrapper>
        <Section title='Sercurity'>
          <ChangePassword />
        </Section>
        <Section title='Customize Tag'>
          Make your own tag that fit your situation
        </Section>
      </MainWrapper>
    )
  }
}
export default Settings
