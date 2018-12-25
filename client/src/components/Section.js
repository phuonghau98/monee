import React from 'react'
const Section = (props) => {
  return (
    <div className='section'>
      <div className='des'>{props.title}</div>
      <div className={props.cssNest}>
        {props.children}
      </div>
    </div>
  )
}
export default Section
