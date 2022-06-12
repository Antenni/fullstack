import React from 'react'
import Weather from './Weather'

const Nations = ({showNations, buttonFilter, showCountry}) => {
  
  if (showNations.length === 1) {
    return (
      <>
      {
      showNations.map(nation =>
        <div key={nation.name}>
          <h1>{nation.name}</h1>
          <p><b>Capital:</b> {nation.capital}</p>
          <p><b>Population:</b> {nation.population}</p>
          <h3>Spoken languages</h3>
          <ul>
            {nation.languages.map(lang =>
              <li key={lang.iso639_1}>{lang.name}</li>
            )}
          </ul>
          <img src={nation.flag} alt="country flag" width="150" />
          <Weather capital={nation.capital} />
        </div>
      )}
    </>
  )
}
  
  if(showNations.length <= 10)
  {
    return (
      <>
        {showNations.map(nation => (
          <p key={nation.name}> {nation.name}
            <button onClick={() => { buttonFilter(nation.name) }}>show</button>
          </p>
        ))}
      </>
      )
  }

  if (showNations.length > 10 && showNations.length < showCountry.length - 1) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  else return null
}
export default Nations