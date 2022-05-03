import React from 'react'

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}
const Part = ({name, exercises}) => {
    return (
      <p>{name} {exercises}</p>
    )
  }

const Content = ({parts}) => {
  return (
<div>
{parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises}/>)}     
</div>
  )
}

const Total = ({parts}) => {
  return (
    <h4>total of {parts.reduce((s,p) => s+p.exercises,0)} exercises</h4>
  )
}

const Course = ({course}) => {
  return (
    <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
  )
}

const App=() => {
  const course = {
    id:1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id:1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return (
    <Course course={course} />
  );
}

export default App;