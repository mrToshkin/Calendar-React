import React from 'react';
import FormEdit from '../Form/FormEdit';
import Context from '../../context';

export default () => {
  const { on, events, id, flagEdit, eventIndex } = React.useContext(Context);
  const event = events.get(id)[eventIndex];

  return (
    <div className='modal__event'>
      { flagEdit && event ? <FormEdit event={event} /> : (
        event ? (
          <div>
            <h2 className='modal__h2'> {event.title}</h2>
            <p>Time: {event.time}</p>
            <p>Members: {event.members}</p>
            <p>Text: {event.text}</p>
          </div>
        ) : <p>Event not selected</p>
      )}
      <div className='modal__btn-close'>
        <button onClick={on.event.hide}> Close </button>
        <button onClick={on.edit.show}> Edit </button>
      </div>
    </div>
  )
}