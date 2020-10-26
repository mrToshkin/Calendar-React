import React from 'react';
import Context from '../../context';

import './Events.scss';

export default () => {
  const { on, id, events } = React.useContext(Context);

  let hasEvents = () => {
    return ( Array.isArray(events.get(id)) ? 
      events.get(id).some(even => even) : false
    )
  }

  return (
    <div>
      <form className="events__add-event" onSubmit={on.form.submit}>
        <label>
          Title:
          <input type="text" name="title" id="title" onChange={on.form.title} required/>
        </label>
        <label>
          Members:
          <input type="text" name="members" id="members" onChange={on.form.members}/>
        </label>
        <label>
          Time:
          <input type="time" name="time" id="time" onChange={on.form.time}/>
        </label>
        <label>
          Event:
          <textarea name="text" id="text" cols="30" rows="10" onChange={on.form.text}></textarea>
        </label>
        <button type='submit'>Add event</button>
      </form>
      <ul className='events__list'>
        <button onClick={on.event.add.bind(null, id, events)}>set</button>
        <button onClick={on.event.remove.bind(null, id)}>remove</button>
        <button onClick={on.event.get.bind(null, id, 2)}>get</button>
        {hasEvents() ? ( 
          events.get(id).map((event, index) => {
            return (
              <li className='events__item' key={index + '.' + id}>
                <strong>{event.time}</strong>
                {event.title}
                <div className="events__item-btn">
                  <button className='events__item-btn-remove' onClick={on.event.remove.bind(null, id, index)}>
                    R
                  </button>
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