import React from 'react';
import Context from '../../context';

export default () => {
  const { events } = React.useContext(Context);

  return (
    <div className="calendar__footer">
      {(Object.keys(events).length > 0) ?
        <p className="calendar__footer-title--has-events">
          У вас есть сохраненные события.
        </p> :
        <p className="calendar__footer-title--no-events">
          У вас нет сохраненных событий.
        </p>
      }
    </div>
  )
}