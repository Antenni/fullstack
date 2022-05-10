import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'

const App = () => {
    
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
    
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  },[])

    const result = persons.filter(person => person.name.includes(newSearch))

    const deletePerson = (event) => {
      event.preventDefault()
      const id = parseInt(event.target.value)
      const personname = persons.find(person => person.id === id)
      if(window.confirm(`Delete ${personname.name}?`)){
        personService
        .remove(id)
        .then(response => {
            setPersons(persons.filter(person => person.id !== id))
        })
      }
  
    }

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

    personService
    .create(personName)
    .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
    })

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
        <Filter title="filter shown with"
        name={newSearch} handleFunction={addNewSearch} />
        <h2>Add a New</h2>
        <PersonForm addAccount={addAccount} newName={newName}
        addNewName={addNewName} newNumber={newNumber}
        addNewNumber={addNewNumber} />
        <h2>Numbers</h2>
        <Persons result={result} delPerson={deletePerson} />
        </div>
  )
}

export default App