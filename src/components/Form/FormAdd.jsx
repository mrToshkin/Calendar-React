import React from 'react';
import Context from '../../context';

export default () => {
  const { on } = React.useContext(Context);

  return (
    <form onSubmit={on.form.add.submit}>
      <label>Title:
        <input 
          type="text" name="title" id="title"
          onChange={on.form.add.title}
          required 
        />
      </label>
      <label>Members:
        <input 
          type="text" name="members" id="members" 
          onChange={on.form.add.members} 
        />
      </label>
      <label>Time:
        <input 
          type="time" name="time" id="time"
          onChange={on.form.add.time} 
        />
      </label>
      <label>Event:
        <textarea 
          name="text" id="text" cols="30" rows="10"
          onChange={on.form.add.text} 
        />
      </label>
      <button type='submit'>Add event</button>
    </form>
  );
}