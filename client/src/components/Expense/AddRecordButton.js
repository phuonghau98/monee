import React from 'react'
const AddRecordButton = (props) => {
  return (
    <div className='addrcbtn'>
      <button onClick={() => {
        props.toggleRecordForm()
      }} >Add record <i className='fas fa-plus' /></button>
    </div>
  )
}

export default AddRecordButton
