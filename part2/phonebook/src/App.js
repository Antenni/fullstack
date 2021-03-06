import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [confirmMessage,setConfirmMessage] = useState(null)
    
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
    setConfirmMessage(`Added ${newName}.`)
    setTimeout(() => {
      setConfirmMessage(null)
    },5000)

  }
    else {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`))
      {
        const changedPerson = {...unique,number:newNumber}
        personService.replace(changedPerson)
        .then(responsedata => {
          setPersons(persons.map(person => person.id===responsedata.id?responsedata:person))

          setConfirmMessage(`Updated ${newName}.`)
          setTimeout(() => {
            setConfirmMessage(null)
          },5000)

       })
        .catch(error => {
          console.log(newName)
          setPersons(persons.filter(person => person.name !== newName))
          setConfirmMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setConfirmMessage(null)
          },5000)

        })
      }
    }

    setNewName('')
    setNewNumber('')
    }
    
    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={confirmMessage} />
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