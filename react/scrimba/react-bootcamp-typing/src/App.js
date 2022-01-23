import React, {useState, useEffect, useRef} from 'react'

export default function App() {

  const INIT_TIME = 5
  const TEXTAREA = useRef(null)

  const [text, setText] = useState('')
  const [time, setTime] = useState(INIT_TIME)
  const [running, setRunning] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (running && time > 0) {
      setRunning(true)
      setTimeout(() => {
        setTime(prev => prev - 1)
      }, 1000)
    } else if (time === 0) {
      setRunning(false)
      setCount(countWords(text))
    }
  }, [time, running])

  function updateText(e) {
    setText(e.target.value)
  }

  function countWords(text) {
    const words = text.trim().split(' ')
    return words.filter(word => word !== '').length
  }

  function toggleRunning() {
    if (!running) {
      TEXTAREA.current.disabled = false
      startGame()
    }
    setRunning(prev => !prev)
  }

  function startGame() {
    setText('')
    setTime(INIT_TIME)
    TEXTAREA.current.focus()
  }

  console.log(running)

  return (
    <>
      <h1>How fast can <em>you</em> type?</h1>
      <textarea
        ref={TEXTAREA}
        onChange={updateText}
        value={text}
        disabled={running ? false : true}
      />
      <h4>Time remaining: {time}</h4>
      <button
        onClick={toggleRunning}
        disabled={running ? true : false }
      >Start</button>
      <h1>Word Count: {count}</h1>
    </>
  )
}