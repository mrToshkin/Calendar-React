import React from 'react';
import Context from '../../context';

export default () => {
  const { setEvent, removeEvent, getEvents } = React.useContext(Context);

  return (
    <form className="events__add-event" onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type='submit'>Add todo</button>
    </form>
  );
}