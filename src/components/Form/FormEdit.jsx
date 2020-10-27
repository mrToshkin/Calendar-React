import React from 'react';
import Context from '../../context';

export default props => {
  const { on } = React.useContext(Context);

  return (
    <form onSubmit={on.form.edit.submit}>
      <label>Title:
        <input 
          type="text" name="title" id="title"
          defaultValue={props.event.title}
          onChange={on.form.edit.title} 
          required
        />
      </label>
      <label>Members:
        <input 
          type="text" name="members" id="members"
          defaultValue={props.event.members}
          onChange={on.form.edit.members} 
        />
      </label>
      <label>Time:
        <input 
          type="time" name="time" id="time"
          defaultValue={props.event.time}
          onChange={on.form.edit.time} 
        />
      </label>
      <label>Event:
        <textarea 
          name="text" id="text" cols="30" rows="10"
          defaultValue={props.event.text}
          onChange={on.form.edit.text}
        />
      </label>
      <button type='submit'>Edit event</button>
    </form>
  );
}