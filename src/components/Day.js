import React from 'react';

function Day(props) {
  return (
    props.days.map((week) => {
      return week.map((day) => {
        return (
          <div className="calendar__day">
            <p>{day}</p>
          </div>
        )
      })
    })
  )
}

export default Day;