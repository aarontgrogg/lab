/**
 * Imports:
 * React library
 * useState - handles state of app
 * userRef - recongizes "current" element being acted upon
 * useEffect - watches for changes to 
 */
import React, { useState, useRef, useEffect } from 'react'
// custom component
import ToDoList from './ToDoList'
// Node module forcreating UIDs
import { v4 as uuidv4 } from 'uuid'

// key for LS
const LOCAL_STORAGE_KEY = 'wds-todos'

// main App function
function App() {
  // setup state using todos array & function to call when it changes
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleTodoAdd(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, {
        id: uuidv4(),
        name: name,
        complete: false
      }]
     })
    todoNameRef.current.value = null
    todoNameRef.current.focus()
  }

  function handlerTodoChange(id) {
    console.log('handleTodoClear: ', id)
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleTodoClear() {
    console.log('handleTodoClear')
    const newTodos = todos.filter(todo => !todo.complete)
    console.log(newTodos.length)
    setTodos(newTodos)
  }

  return (
    <>
      <ToDoList todos={todos} handlerTodoChange={handlerTodoChange} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleTodoAdd}>Add</button>
      <button onClick={handleTodoClear}>Clear</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
