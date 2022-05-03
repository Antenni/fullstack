import React from 'react'

const Header = ({name}) => {
    return (
      <h1>{name}</h1>
    )
  }
  const Part = (props) => {
    return (
      <p>{props.name} {props.exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <h4>total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises</h4>
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
  const Course = ({course}) => {
    return (
      <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </div>
    )
  }
export default Course