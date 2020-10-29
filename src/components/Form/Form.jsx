import React from 'react';

export default ({ setting }) => {
  const { submit, input, value, title, members, time, textArea, textSubmit } = setting;

  return (
    <form className="form" method='post' onSubmit={submit}>
      <label>Заговок:
        <input
          type="text" name={title} id={title}
          defaultValue={value.title}
          className='form__input-text'
          onChange={input}
          required
        />
      </label>
      <label>Участники:
        <input
          type="text" name={members} id={members}
          defaultValue={value.members}
          className='form__input-text'
          onChange={input}
        />
      </label>
      <label>Время:
        <input
          type="time" name={time} id={time}
          defaultValue={value.time}
          className='form__time'
          onChange={input}
        />
      </label>
      <label>Событие:
        <textarea
          name={textArea} id={textArea}
          defaultValue={value.text}
          className='form__textarea'
          onChange={input}
        />
      </label>
      <button type='submit'>{textSubmit}</button>
    </form>
  );
}