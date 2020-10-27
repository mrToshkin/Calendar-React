import React from 'react';
import Context from '../../context';

export default () => {
  const { on, id, events } = React.useContext(Context);

  let hasEvents = () => {
    return ( Array.isArray(events.get(id)) ? 
      events.get(id).some(even => even) : false
    )
  }

  return (
    <div>
      <ul className='events__list'>
        <button onClick={on.event.add.bind(null, id, { time: 'Mock', title: 'Mock', members: 'Mock', text: 'Mock'})}>set</button>
        <button onClick={on.event.remove.bind(null, id)}>remove</button>
        <button onClick={on.event.get.bind(null, id, 2)}>get</button>
        {hasEvents() ? ( 
          events.get(id).map((event, index) => {
            return (
              <li className='events__item' key={index + '.' + id}>
                <div onClick={on.event.show.bind(null, id, index)}>
                  <strong>{event.time}</strong>
                  {event.title}
                </div>
                <div className="events__item-btn">
                  <button className='events__item-btn-remove' onClick={on.event.remove.bind(null, id, index)}>
                    &times;
                  </button>
                </div>
              </li>
            );
          })
        ) : <p>No events.</p>}  
      </ul>
    </div>
  );
}