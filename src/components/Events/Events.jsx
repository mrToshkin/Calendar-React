import React from 'react';
import Context from '../../context';

export default () => {
  const { on, id, events, hasEvents } = React.useContext(Context);

  return (
    <div>
      {/* <button onClick={on.mock.add.bind(null, id, { time: '15:35', title: 'Mock', members: 'Mock', text: 'Mock' })}>Mock</button>
      <button onClick={on.mock.get.bind(null, id, 2)}>Get</button> */}
      <ul className='events__ul'>
        {hasEvents(id) ? ( 
          events[id].map((event, index) => {
            return (
              <li className='events__li' key={index + '.' + id}>
                <button className='events__item button-reset' onClick={on.event.show.bind(null, id, index)}>
                  <span className='events__item-time'>{event.time !== '' ? event.time : '-- : --'}</span>
                  <span className="events__item-title">{event.title}</span>
                </button>
                <button className='events__item-btn-remove button-reset' onClick={on.event.remove.bind(null, id, index)}>
                  <span>Удалить событие</span>
                </button>
              </li>
            );
          })
        ) : <p>Нет событий.</p>}  
      </ul>
    </div>
  );
}