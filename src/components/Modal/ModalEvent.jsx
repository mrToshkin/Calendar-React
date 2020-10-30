import React from 'react';
import Form from '../Form/Form';
import Context from '../../context';

export default () => {
  const { on, events, id, flagEdit, eventIndex } = React.useContext(Context);
  const event = events[id][eventIndex];
  const settingForm = {
    title: 'titleEdit',
    members: 'membersEdit',
    time: 'timeEdit',
    textArea: 'textEdit',
    textSubmit: 'Сохранить редактирование',
    value: event,
    input: on.form.input,
    submit: on.form.submit.edit
  }

  return (
    <div className='modal__event'>
      { flagEdit && event ? <Form setting={settingForm}/> : (
        event ? (
          <div>
            <h2 className='modal__h2 modal__h2--event-title'> {event.title}</h2>
            <p>Участники:</p>
            <p>{event.members}</p>
            <p>Время: {event.time}</p>
            <p>Событие:</p>
            <p>{event.text}</p>
            <button className='modal__btn-edit button-reset' onClick={on.edit.show}><span>Редактировать событие</span></button>
          </div>
        ) : <p>Событие не выбрано</p>
      )}
      <button className='modal__btn-close button-reset' onClick={on.event.hide}><span>Закрыть событие</span></button>
    </div>
  )
}