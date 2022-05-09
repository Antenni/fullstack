import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Nations = ({setSearchName,showNations}) => {
  if (showNations.length === 1) {
    return (
      <div>
        <h1>{showNations[0].name.common}</h1>
      <div>
        capital {showNations[0].capital.toString()}
        </div>
      <div>
        area {showNations[0].area.toString()}
        </div>
      <div>
        <h3>languages</h3>
        <ul>
        {Object.values(showNations[0].languages).map(
          language => <li key={language}>{language}</li>
        )}
        </ul>
      <div>
      <img src={showNations[0].flags.png} alt="flag" />
      </div>
      </div>
      </div>
    )
  }
  else if(showNations.length <= 10)
  {
    return(
      <div>
        {showNations.map((countries) => <div key={countries.name.common}>{countries.name.common}&nbsp;
        <button type="button" value={countries.name.common} onClick={() => setSearchName(countries.name.common)}>show</button>
        </div>
      )
      }
        </div>
    )
  }
  else{
    return (
      <div>
        Too many matches, specify another filter
        </div>
    )
  }
}
const App = () => {
  const [countries,setCountries] = useState([])
  const [searchWord,setSearchName] = useState('')

  const effectHook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(effectHook,[])

  const showNations = countries.filter(country => country.name.common.toLowerCase().includes(searchWord.toLowerCase()))
  console.log(showNations)

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }
  return (
    <div>
    <div>
      find countries <input value={searchWord} onChange={handleSearchChange}/>
      </div>
    <Nations showNations={showNations} setSearchName={setSearchName}/>
    </div>
  )
}
export default App 