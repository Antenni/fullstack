import { useState } from 'react'

const Button = (props) => {
  console.log()
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Value = ({text,sum}) => {
  return (
    <p>{text} {sum}</p>
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
      <Value text="good" sum={good} />
      <Value text="neutral" sum={neutral} />
      <Value text="bad" sum={bad} />
      <Value text="all" sum={all} />
      <Value text="average" sum={average} />
      <Value text="positive" sum={positive +' %'} />
    </div>
  )
}
  export default App