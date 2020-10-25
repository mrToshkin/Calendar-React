import React from 'react'
import TodoItem from './TodoItem'

export default props => {
  return (
    <ul className='events__list'>
      {props.todos.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            index={index}
            onChange={props.onToggle}
          />
        )
      })}
    </ul>
  )
}