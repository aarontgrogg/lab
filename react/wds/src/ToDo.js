import React from 'react'

export default function ToDo({ todo, handlerTodoChange }) {
    function toggleTodo() {
        handlerTodoChange(todo.id)
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={toggleTodo}/>
                {todo.name}
            </label>
        </div>
    )
}
