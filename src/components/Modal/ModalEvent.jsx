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
      { flagEdit && event ?
        <>
          <h2 className='modal__h2'>Редактирование:</h2>
          <Form setting={settingForm}/>
          <button className='modal__btn-close button-reset' onClick={on.edit.hide}><span>Закрыть редактирование</span></button>
        </> : ( event ? (
        <>
          <h2 className='modal__h2 modal__h2--event-title'> {event.title}</h2>
          <div className="modal__line" />
          <p><strong>Участники:</strong> {event.members}</p>
          <div className="modal__line" />
          <p><strong>Время:</strong> {event.time}</p>
          <div className="modal__line" />
          <p><strong>Событие:</strong> {event.text}</p>
          <button className='modal__btn-edit button-reset' onClick={on.edit.show}><span>Редактировать событие</span></button>
          <button className='modal__btn-close button-reset' onClick={on.event.hide}><span>Закрыть событие</span></button>
        </>
        ) : 
        <>
          <h2 className='modal__h2 modal__h2--event-title'>Событие<br/>не выбрано</h2>
          <button className='modal__btn-close button-reset' onClick={on.event.hide}><span>Закрыть событие</span></button>
        </>
      )}
    </div>
  )
}