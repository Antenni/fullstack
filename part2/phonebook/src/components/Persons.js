import React from 'react'

const Persons = ({result, delPerson}) => {
  return (
    <div>
      {result.map(person =>
      <div key={person.id}>{person.name} {person.number}
      <button type="button" value={person.id} onClick={delPerson}>
        delete</button>
      </div>
    )}
    </div>
  )
}

export default Persons