import React from 'react';
import Events from '../Events/Events';
import Form from '../Form/Form';
import ModalEvent from './ModalEvent'
import Context from '../../context';
import moment from 'moment';

export default () => {
  const { on, id, flagEvent } = React.useContext(Context);
  const settingForm = {
    title: 'title',
    members: 'members',
    time: 'time',
    textArea: 'text',
    textSubmit: 'Добавить событие',
    value: {title: '', members: '', time: '', text: ''},
    input: on.form.input,
    submit: on.form.submit.add,
  }

  return (
    <div className='modal'>  
      <div className="modal__overlay" onClick={() => { on.day.hide(); on.event.hide() }} />   
      { flagEvent && <ModalEvent />}
      <div className='modal__day'>
        <h2 className='modal__h2'>{moment(id).format('D MMMM YYYY')}</h2>
        <Form setting={settingForm}/>
        <div className="modal__line"/>
        <Events />
        <button className="modal__btn-close button-reset" onClick={on.day.hide}><span>Закрыть день</span></button>
      </div>
    </div>
  );
}
