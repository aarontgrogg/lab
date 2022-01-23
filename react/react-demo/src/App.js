import React from 'react'
import TableSimple from './Table-simple'
import TableClass from './Table-class'
import TableProps from './Table-props'
import TableState from './Table-state'
import Form from './Form'
import Api from './Api'

const characters = [
  {
    name: 'Charlie',
    job: 'Janitor',
  },
  {
    name: 'Mac',
    job: 'Bouncer',
  },
  {
    name: 'Dee',
    job: 'Aspring actress',
  },
  {
    name: 'Dennis',
    job: 'Bartender',
  },
]

class App extends React.Component {
  // for TableState only
  state = {
    characters: characters,
  }
  // for TableState only
  removeCharacter = ( index ) => {
    // get current state
    const { characters } = this.state
    // update state by filtering out the `index` passed to this fn
    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      })
    })
  }

  handleSubmit = (character) => {
    this.setState({
      characters: [...this.state.characters, character]
    })
  }
  render() {
    // get current state
    // const { characters } = this.state
    // console.log('this.state: ', this.state)
    // console.log('characters: ', characters)
    return (
      <div className="App">
        <h1>Hello World!</h1>
        <hr/>
        <TableSimple />
        <hr/>
        <TableClass />
        <hr/>
        <TableProps characterData={characters}/>
        <hr/>
        <TableState characterData={this.state.characters} removeCharacter={this.removeCharacter} />
        <hr/>
        <Form handleSubmit={this.handleSubmit} />
        <hr/>
        <Api />
      </div>
    )
  }
}

export default App;