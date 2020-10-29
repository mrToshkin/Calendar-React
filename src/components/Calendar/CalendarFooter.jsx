import React from 'react';
import Context from '../../context';

export default () => {
  const { events } = React.useContext(Context);

  return (
    <div className="calendar__footer">
      {(events.size > 0) ?
        <p className="calendar__footer-title--has-events">
          У вас были сохраненные события. Состояние изменится после обновления страницы.
        </p> :
        <p className="calendar__footer-title--no-events">
          У вас нет сохраненных событий.
        </p>
      }
    </div>
  )
}