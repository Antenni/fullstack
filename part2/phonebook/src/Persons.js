import React from 'react'

const Persons = ({result}) => {
  return (
    <div>{result.map((person,p) =>
        <div key={p}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default Persons