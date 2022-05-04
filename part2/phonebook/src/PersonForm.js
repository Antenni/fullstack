import React from 'react'

const PersonForm = ({addAccount,newName,addNewName,newNumber,addNewNumber}) => {
  return (
    <div>
      <form onSubmit={addAccount}>
        <div>
          name: <input value={newName} onChange={addNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={addNewNumber}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm