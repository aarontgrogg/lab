import React from 'react'
import Start from './components/Start'
import Game from './components/Game'

export default function App() {
  /*
    Requirements:
    - start screen:
      - "Quizzical"
      - "Start Quiz" button
      - user can click start button
    - quiz page:
      - fetch & display 5 questions and answer options
      - "Check answers" button
      - user can pick answers; highlight answer
      - user can click button; indicate right/wrong answers
      - remove "check" button
      - add score & "Play again"
  */

  // track game state
  const [game, setGame] = React.useState('welcome')

  // will receive questions from API fetch
  const [questions, setQuestions] = React.useState([])

  // handle API fetch
  React.useEffect(() => {
    console.log('fetching API')
    // if (game === 'new') {
      fetch('https://opentdb.com/api.php?amount=5&category=12')
          .then(res => res.json())
        .then(data => {
          console.log('data.results', data.results)
          setQuestions(data.results)
          //setGame('quiz')
        })
    // }
  }, []);

  function startGame() {
    console.log('startGame')
    setGame('quiz')
  }

  function checkAnswers() {
    console.log('checkAnswers')
  }
  function playAgain() {
    console.log('playAgain')
    setGame('new')
  }

  return (
    <main>
      {
        game === 'welcome' ?
        <Start startGame={startGame} /> :
        <Game questions={questions} checkAnswers={checkAnswers} playAgain={playAgain} />
      }
    </main>
  );
}