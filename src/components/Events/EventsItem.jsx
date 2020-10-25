import React from 'react';
import Context from '../../context';

export default () => {
  const { setEvent, removeEvent, getEvents } = React.useContext(Context);

  return (
    <div>
      {/* <button onClick={setEvent.bind(null, "that key", 'textsdsdas')}>set</button>
      <button onClick={removeEvent.bind(null,  "that key")}>remove</button>
      <button onClick={getEvents.bind(null,  "that key", 2)}>get</button> */}
    </div>
  )
}