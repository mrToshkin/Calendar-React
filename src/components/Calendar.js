import React, { useState, useEffect } from 'react';
import './calendar.scss';
import Day from './Day';
import moment from 'moment';

function Calendar() {
  const [days, setDays] = useState(generateDays());
    
  console.log(days);
  
  function generateDays() {
    moment.updateLocale('en', { week: { dow: 1 } });
    const startDay = moment().startOf('month').startOf('week');
    const endDay = moment().endOf('month').endOf('week');
    let day = startDay.clone();
    let flag = true;

    /* for (let i in result) {
      for (let j in result[i]) {
        
      }
    } */
    
    return (
      [...Array(5)].map(() =>
        [...Array(7)].map(() => {
          if (flag) {
            flag = false;
            return day._d.getDate();
          } else {
            return day._d.getDate(day._d.setDate(day._d.getDate() + 1));
          }
        })
      )
    );
  }

  return (
    <div className="calendar">
      <div className="calendar__controls">
        <p>buttons</p>
      </div>
      <div className="calendar__grid">
        <Day days={days} key={days} />
      </div>
    </div>
  )
}

export default Calendar;