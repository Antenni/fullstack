import React from 'react'

const Persons = ({result}) => {
  return (
    <div>
      {result.map(person =>
      <div key={person.id}>{person.name} {person.number}
      </div>
    )}
    </div>
  )
}

export default Persons