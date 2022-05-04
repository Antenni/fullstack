import { useState } from 'react'

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }]) 
  
    const [newName, setNewName] = useState('')

  const addNewName = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    var unique = persons.find(person => person.name === newName)
    if (typeof unique === 'undefined'){

    const personName = {name: newName}

    setPersons(persons.concat(personName))
    setNewName('')
  }
  else {
    window.alert(`${newName} is already added to the phonebook`)
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={addNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person,p) =>
      <div key={p}>{person.name}</div>)}
    </div>
  )
}

export default App