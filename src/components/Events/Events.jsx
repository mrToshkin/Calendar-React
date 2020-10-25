import React from 'react';
import EventsItem from './EventsItem';
import Context from '../../context';

export default () => {
  const { setEvent, removeEvent, getEvents, id, events } = React.useContext(Context);

  return (
    <div>
      <ul className='events__list'>
        <button onClick={setEvent.bind(null, id, 'textsdsdas')}>set</button>
        <button onClick={removeEvent.bind(null, id)}>remove</button>
        <button onClick={getEvents.bind(null, id, 2)}>get</button>
        {
          events.has(id) ? (
            events.get(id).map((event, index) => {
              return (
                <li className='events__item' key={index + '.' + id}>
                  <strong>{index + 1}</strong>
                  {event}
                  <button className='events__item-btn-remove' onClick={removeEvent.bind(null, id, index)}>
                    &times;
                  </button>
                </li>
              )
            })
          ) : <p>No events!</p>
        }  
      </ul>
    </div>
  )
}