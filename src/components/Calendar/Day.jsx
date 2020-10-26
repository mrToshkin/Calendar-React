import React from 'react';

export default props => {
  return (
    <div className="calendar__day" onClick={props.openModal} >
      <p>{props.data.day}</p>
    </div>
  );
}