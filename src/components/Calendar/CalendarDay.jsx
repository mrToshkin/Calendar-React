import React from 'react';
import Context from '../../context';

export default props => {
  const { on } = React.useContext(Context);
  
  return (
    <div className="calendar__day" onClick={on.day.show.bind(null, props.data.id)} >
      <p>{props.data.day}</p>
    </div>
  );
}