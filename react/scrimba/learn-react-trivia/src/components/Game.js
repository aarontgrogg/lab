import React from 'react'

export default function Game(props) {
    console.log('Game props', props)

    function randomNumber() {
        return Math.floor(Math.random() * (999999 - 1 + 1) + 1)
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }

    function buildQuestions() {
        return (
            props.questions.map((question, index) => {
                let answers = [...question.incorrect_answers, question.correct_answer]
                if (question.type !== 'boolean') {
                    answers = shuffleArray(answers)
                }
                const options = buildAnswers(index, answers)
                return (
                    <li key={randomNumber()}>
                        {question.question}
                        {options}
                    </li>
                )
            })
        )
    }

    function buildAnswers(index, options) {
        console.log('buildAnswers', index, options)
        return (
            <div>{
                options.map(option => {
                    return (
                        <button
                            key={randomNumber()}
                            id={index}
                            onClick={(event) => selectAnswer(event)}
                        >{option}
                        </button>
                    )
                })
            }
            </div>
        )
    }

    function selectAnswer(event) {
        console.log('selectAnswer', event)
    }

    return (
        <section>
            <h1>Game</h1>
            <ol>{buildQuestions()}</ol>
            <button onClick={props.checkAnswers}>Check answers</button>
            <button onClick={props.playAgain}>Play again</button>
        </section>
    )
}