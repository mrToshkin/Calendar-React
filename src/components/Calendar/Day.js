import React from 'react';
import Modal from '../Modal/Modal';

function Day(props) {
  return (
    <div className="calendar__day">
      <p>{props.data.day}</p>
    </div>
  )
}

export default Day;