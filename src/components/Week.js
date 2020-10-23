import React from 'react';
import Day from './Day';

function Week(props) {
  return (
    props.map((week) => {
      return (
        <div className="calendar__week">
          <Day props={week} />
        </div>
      )
    })
  );
}

export default Week;