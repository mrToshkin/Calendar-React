import React from 'react';
import Context from '../../context';

export default props => {
  const { on } = React.useContext(Context);
  const classes = ['calendar__day'];

  if (props.markDay.unmonth)   classes.push('calendar__day--unmonth')
  if (props.markDay.today)     classes.push('calendar__day--today')
  if (props.markDay.hasEvents) classes.push('calendar__day--events')
  
  return (
    <td className={classes.join(' ')} onClick={on.day.show.bind(null, props.week.id)} >
      {props.week.day}
    </td>
  );
}