import React from 'react'

export default function Die(props) {
    return (
        <button
            id={props.id}
            onClick={event => props.onClick(event, props.id)}
            className={props.isHeld ? 'selected' : ''}
        >{props.value}</button>
    )
}

































/* import React from 'react'

export default function Die(props) {
    return (
        <button
            className={props.isHeld ? 'selected' : ''}
            onClick={event => props.holdDie(event, props.id)}
        >
            {props.value}
        </button>
    )
} */