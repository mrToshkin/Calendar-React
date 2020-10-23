import React from 'react';
import Modal from '../Modal/Modal';

function Day(props) {

  return (
    props.days.map((week) => {
      return week.map((day) => {
        return (
          <div className="calendar__day" onClick={() => <Modal/>}>
            <p>{day}</p>
          </div>
        )
      })
    })
  )
}

export default Day;