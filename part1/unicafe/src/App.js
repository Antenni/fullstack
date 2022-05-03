import { useState } from 'react'

const Button = (props) => {
  console.log()
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Value = ({text,value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <Value text="good" value={props.good}/>
      <Value text="neutral" value={props.neutral}/>
      <Value text="bad" value={props.bad}/>
      <Value text="all" value={props.all}/>
      <Value text="average" value={props.average}/>
      <Value text="positive" value={props.positive.toFixed(1) +' %'}/>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad)/(all)
  const positive = (good/all*100)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />&nbsp;
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />&nbsp;
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}
  export default App