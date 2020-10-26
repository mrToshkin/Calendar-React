import React from 'react';
import Events from '../Events/Events';
import './Modal.scss';

export default props => {
  return (
    <div className='modal'>
      <div className="modal__overlay" onClick={props.closeModal}/>
      <div className='modal__body'>
        <h1>Events:</h1>
        <Events />
        <div className='modal__btn-close'>
          <button onClick={props.closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
