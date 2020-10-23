import React, { useState, useEffect } from 'react';
import './calendar.scss';
import Day from './Day';
import moment from 'moment';

function Calendar() {
  const [data, setData] = useState(generateDays());
    
  console.log(data);
  
  function generateDays() {
    moment.updateLocale('en', { week: { dow: 1 } });
    const startDay = moment().startOf('month').startOf('week');
    const endDay = moment().endOf('month').endOf('week');
    let day = startDay.clone();
    let flag = true;
    
    function Data(day, id) {
      this.id = id;
      this.day = day._d.getDate();
      this.month = day._d.getMonth();
      this.year = day._d.getFullYear();
    };

    return (
      [...Array(35)].map((item, id) => {
        if (flag) {
          flag = false;
          return new Data(day, id);
        } else {
          day._d.setDate(day._d.getDate() + 1);
          return new Data(day, id);
        }
      })
    );
  }

  return (
    <div className="calendar">
      <div className="calendar__controls">
        <p>buttons</p>
      </div>
      <div className="calendar__grid">
        {data.map(data => {
          return <Day data={data} key={data.id} />
        })}
      </div>
    </div>
  )
}

export default Calendar;