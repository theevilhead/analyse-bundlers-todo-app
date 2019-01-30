import React, { Component } from 'react'
import './main.scss'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: []
    }
    this.handleNewTodo = this.handleNewTodo.bind(this)
  }

  componentDidMount () {
    this.setState({
      todos: this.extract()
    })
  }

  save (data) {
    window.localStorage.setItem('todos', JSON.stringify(data || this.state.todos))
  }

  extract () {
    return JSON.parse(window.localStorage.getItem('todos')) || []
  }

  clear (e) {
    e.preventDefault()
    window.localStorage.removeItem('todos')
    this.setState({
      todos: []
    })
  }

  handleNewTodo (e) {
    if ((e.key !== ' ' && e.key !== 'Enter') || e.target.value.trim() === '') {
      return
    }
    this.setState({
      todos: this.state.todos.concat([{
        title: e.target.value,
        id: Math.floor(Math.random() * 10000),
        done: false
      }])
    }, this.save.bind(this))
    e.target.value = ''
  }

  check (id) {
    console.log(id)
    const newList = this.state.todos.filter(todo => todo.id !== id)
    this.save(newList)
    this.setState({
      todos: newList
    })
  }

  render () {
    const todosListRender = this.state.todos.map(todo => {
      return (
        <li key={todo.id}>
          <label>
            <input type="checkbox" onChange={this.check.bind(this, todo.id)} /> {todo.title}
          </label>
        </li>
      )
    })
    return (
      <div>
        <h1>TODO app</h1>
        <input type="text" onKeyPress={this.handleNewTodo} placeholder="Type and hit enter or space"/>
        <a href="#" onClick={this.clear.bind(this)}>Clear all</a>
        <ul>
          {todosListRender.length > 0 ? todosListRender : <small>Nothing added yet</small>}
        </ul>
      </div>
    )
  }
}
