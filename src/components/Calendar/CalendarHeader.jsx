import React from 'react';
import Context from '../../context';
import moment from 'moment';

export default () => {
  const { on, month, year } = React.useContext(Context);
  const TO_MIDDLE_LIST = 4;

  return (
    <div className="calendar__header">
      <div className="calendar__controls">
        <div className="calendar__controls-months-case">
          <button className="calendar__controls-button calendar__controls-button-left button-reset" onClick={on.header.month.prev}>
            <span>Предыдущий месяц</span> 
          </button>
          <select
            name="month"
            id="month"
            value={moment().month(month).format('MMMM')}
            onChange={on.header.month.select}
            className="calendar__controls-select button-reset"
          >
            {moment.months().map(name =>
              <option value={name} key={name}>{name}</option>
            )}
          </select>
          <button className="calendar__controls-button calendar__controls-button-right button-reset" onClick={on.header.month.next}>
            <span>Следующий месяц</span>
          </button>
        </div>    
        <div className="calendar__controls-years-case">
          <button className="calendar__controls-button calendar__controls-button-left button-reset" onClick={on.header.year.prev}>
            <span>Предыдущий год</span>
          </button>
          <select 
            name="year"
            id="year"
            value={year}
            onChange={on.header.year.select}
            className="calendar__controls-select button-reset"
          >
            {[...Array(10)]
              .map((item, index) => moment().year(year + index - TO_MIDDLE_LIST).format('YYYY'))
              .map((numb, index) => <option value={numb} key={index}>{numb}</option>)
            } 
          </select>
          <button className="calendar__controls-button calendar__controls-button-right button-reset" onClick={on.header.year.next}>
            <span>Следующий год</span>
          </button>
        </div>
      </div>
    </div>
  );
}