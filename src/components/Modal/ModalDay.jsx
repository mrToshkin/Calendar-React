import React from 'react';
import Events from '../Events/Events';
import FormAdd from '../Form/FormAdd';
import ModalEvent from './ModalEvent'
import Context from '../../context';
import { prettierData } from '../Calendar/prettierData'

export default () => {
  const { days, on, id, flagEvent } = React.useContext(Context);

  return (
    <div className='modal'>  
      <div className="modal__overlay" onClick={() => { on.day.hide(); on.event.hide() }} />   
      { flagEvent && <ModalEvent />}
      <div className='modal__day'>
        <h2 className='modal__h2'>{prettierData(days, id)}</h2>
        <FormAdd />
        <Events />
        <div className='modal__btn-close'>
          <button onClick={on.day.hide}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
