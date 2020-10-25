import React from 'react';
import Context from '../../context';

export default ({ todo, index, onChange }) => {
  const { removeTodo } = React.useContext(Context)
  const classes = []

  if (todo.completed) {
    classes.push('events__input--done');
  }

  return (
    <li className='events__item'>
      <span className={classes.join(' ')}>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => onChange(todo.id)}
        />
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>

      <button className='events__item-btn-close' onClick={removeTodo.bind(null, todo.id)}>
        &times;
      </button>
    </li>
  )
}