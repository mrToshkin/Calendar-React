import React from 'react';

export default ({ setting }) => {
  const { submit, input, value, title, members, time, textArea, textSubmit } = setting;

  return (
    <form className="form" method='post' onSubmit={submit}>
      <label htmlFor={title}>Заговок: </label>
        <input
          type="text" name={title} id={title}
          defaultValue={value.title}
          className='form__input-text input-reset'
          onChange={input}
          required
        />
      <label htmlFor={members}>Участники:</label>
        <input
          type="text" name={members} id={members}
          defaultValue={value.members}
          className='form__input-text input-reset'
          onChange={input}
        />
      <label htmlFor={time}>Время:
        <input
          type="time" name={time} id={time}
          defaultValue={value.time}
          className='form__time input-reset'
          onChange={input}
        />
      </label>
      <label htmlFor={textArea}>Событие:</label>
        <textarea
          name={textArea} id={textArea}
          defaultValue={value.text}
          className='form__textarea input-reset'
          onChange={input}
        />
      <button type='submit' className='form__submit button-reset'>{textSubmit}</button>
    </form>
  );
}