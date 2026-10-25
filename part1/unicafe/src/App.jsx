import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad
  const average = total ? (good - bad) / total : 0
  const positive = total ? good * 100 / total : 0

  return (
    <div>
      <h1>statistics</h1>
      <p>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}<br />
        all {total}<br />
        average {average}<br />
        positive {positive} %
      </p>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad= () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={increaseGood}>good</button>
      <button onClick={increaseNeutral}>neutral</button>
      <button onClick={increaseBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App