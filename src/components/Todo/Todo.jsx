import React from 'react';
import Context from '../../context';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

import './Todo.scss';

export default props => {
  const [todos, setTodos] = React.useState([{
    title: 'fuck',
    id: Date.now(),
    completed: false
  }]);

  /* React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => setTodos(todos))
  }, []) */

  function toggleTodo(id) {
    setTodos(todos.map(todo => {
      if (todo.id === id) todo.completed = !todo.completed
      return todo
    })
  )}

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false
        }
      ])
    )
  }

  return (
    <Context.Provider value={{ removeTodo }}>    
      <div>
        <AddTodo onCreate={addTodo} />
        {todos.length ? 
          <TodoList todos={todos} onToggle={toggleTodo} />
         : <p>No todos!</p>}
      </div>
    </Context.Provider>
  )
}