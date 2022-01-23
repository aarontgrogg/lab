import React from 'react'
import Die from './Die.js'
import { nanoid, random } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  const [tenzies, setTenzies] = React.useState(false)

  const [dice, setDice] = React.useState(allNewDice())

  React.useEffect(() => {
    let isHeld = new Set(),
      value = new Set()
    dice.map(die => {
      isHeld.add(die.isHeld)
      value.add(die.value)
    })
    if (isHeld.size === 1 && value.size === 1) {
      setTenzies(true)
    }
  }, [dice])

  function newDie() {
    const min = 1,
      max = 6
    return {
              id: nanoid(),
              value: Math.floor(Math.random() * (max - min + 1) + min),
              isHeld: false
            }
  }

  function allNewDice() {
    const dice = []
    for (let i = 0; i < 10; i++) {
      dice.push(newDie())
    }
    return dice
  }

  function holdDie(event, id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : newDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  const diceElements = dice.map(die => {
    return (
        <Die
          key={die.id}
          id={die.id}
          value={die.value}
          isHeld={die.isHeld}
          onClick={holdDie}
      />
    )
  })

  return (
    <main>
      <h1>Tenzies</h1>
      <p>Instructions:</p>
      <ol>
        <li>Look at the dice below and decide which number you are going to "go for".</li>
        <li>For example, if you have more <kbd>3</kbd>’s than any other number, that’s what you want to go for.</li>
        <li>Click all the dice with that number, then click the <strong>Roll</strong> button.</li>
        <li>Repeat the previous step until all ten of your dice show the same number.</li>
        <li>Shout out “TENZI” because you just won!</li>
      </ol>
      <section className="dice-container">
        {diceElements}
      </section>
      <button 
        className="dice-roll"
        onClick={rollDice}
      >{tenzies ? 'New Game' : 'Roll'}</button>
      {tenzies && <Confetti />}
    </main>
  )
}






























/* import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  const [tenzies, setTenzies] = React.useState(false)

  const [dice, setDice] = React.useState(allNewDice())

  React.useEffect(() => {
    // instructor version:
    // const allHeld = dice.every(die => die.isHeld)
    // const firstValue = dice[0].value
    // const allSameValue = dice.every(die => die.value === firstValue)
    // if (allHeld && allSameValue) {
    //     setTenzies(true)
    //     console.log("You won!")
    // }
   
    let held = new Set,
      value = new Set;
    for (let i = 0; i < dice.length; i++) {
      held.add(dice[i].isHeld)
      value.add(dice[i].value)
    }
    if (held.size === 1 && value.size === 1) {
      weHaveAWinner()
    }
  }, [dice])

  function newDie() {
    const min = 1,
      max = 6
    return (
        {
          id: nanoid(),
          value: Math.floor(Math.random() * (max - min + 1) + min),
          isHeld: false
        }
    )
  }
  
  function allNewDice() {
    const arr = []
    for (let i = 0; i < 10; i++) {
      arr.push( newDie() )
    }
    return arr
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : newDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDie(event, id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }
  function weHaveAWinner() {
    console.log('We have a wiener!')
    setTenzies(true)
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={holdDie}
    />)
  )

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <section className="dice-container">
        {diceElements}
      </section>
      <button
        className="dice-roll"
        onClick={rollDice}
      >{tenzies ? 'New Game' : 'Roll'}</button>
      {tenzies && <Confetti />}
    </main>
  );
} */