import React from 'react';

function useInputValue(defaultValue = '') {
  const [value, setValue] = React.useState(defaultValue)

  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(''),
    value: () => value
  }
}

export default ({ onCreate }) => {
  const input = useInputValue('')

  function submitHandler(event) {
    event.preventDefault()

    if (input.value().trim()) {
      onCreate(input.value())
      input.clear()
    }
  }

  return (
    <form className="events__add-event" onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type='submit'>Add todo</button>
    </form>
  )
}