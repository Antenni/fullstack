import { useState } from 'react'

const Button = (props) => {
  console.log()
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
      <table>
        <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
      </table>
    </div>
  )
}

const Statistics = (props) => {
  if(props.all === 0)
{
  return (
    <p>No feedback given</p>
  )
}
  return (
    <div>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.all}/>
      <StatisticLine text="average" value={props.average}/>
      <StatisticLine text="positive" value={props.positive.toFixed(1) +' %'}/>
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
      <table>
        <tbody>
          <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
        </tbody>
      </table>
    </div>
  )
}
  export default App