import { useState } from 'react'

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 } ])
  
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')

    const result = persons.filter(person => person.name.includes(newSearch))

    const addNewSearch = (event) => {
      setNewSearch(event.target.value)
    }

  const addNewName = (event) => {
    setNewName(event.target.value)
  }

  const addNewNumber = (event) => {
      setNewNumber(event.target.value)
  }
  const addAccount = (event) => { 
  event.preventDefault()
    var unique = persons.find(person => person.name === newName)
    if (typeof unique === 'undefined'){

    const personName = {name: newName, number: newNumber}

    setPersons(persons.concat(personName))
    setNewName('')
  }
  else {
    window.alert(`${newName} is already added to the phonebook`)
  }
  setNewName('')
  setNewNumber('')
}

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={newSearch} onChange={addNewSearch} />
      <h2>add a new</h2>
      <form onSubmit={addAccount}>
        <div>
          name: <input value={newName} onChange={addNewName} />
        </div>
        <div>
        number: <input value={newNumber} onChange={addNewNumber}/>
      </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {result.map((person,p) =>
      <div key={p}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App