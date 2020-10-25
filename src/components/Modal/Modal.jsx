import React from 'react';
import Todo from '../Todo/Todo';
import './Modal.scss';

export default props => {
  return (
    <div className='modal'>
      <div className='modal__body'>
        <h1>Events:</h1>
        <Todo data={props} />
        <div className='modal__btn-close'>
          <button onClick={props.closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
