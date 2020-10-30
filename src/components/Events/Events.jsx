import React from 'react';
import Context from '../../context';

export default () => {
  const { on, id, events, hasEvents } = React.useContext(Context);

  return (
    <div>
      <button onClick={on.mock.add.bind(null, id, { time: '15:35', title: 'Mock', members: 'Mock', text: 'Mock' })}>Mock</button>
      <button onClick={on.mock.get.bind(null, id, 2)}>Get</button>
      <ul className='events__list'>
        {hasEvents(id) ? ( 
          events[id].map((event, index) => {
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
        ) : <p>Нет событий.</p>}  
      </ul>
    </div>
  );
}