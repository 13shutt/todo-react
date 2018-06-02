import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import style from './style.css'

class TodoApp extends Component {
  state = {
    tasks: [
      {id: Date.now(), text: "Test Task", ifDone: false}
    ],
    renderTasks: "ALL",
    counter: 0
  }

  addNewTask = (e) => {
    e.preventDefault()
    if (e.target[0].value != "") {
      this.setState({
        tasks: [...this.state.tasks, {id: Date.now(), text: e.target[0].value, ifDone: false}]
      })} else {
        alert('eeeeeee bleeeeet!!!')
      }
    e.target[0].value = ''
  }

  renderTasks = () => {
    switch(this.state.renderTasks) {
      case("ALL"):
        var TaskList = this.state.tasks.map((item, index) => {
          return (
            <div className={`task ${item.ifDone}`}>
              <i className="fa fa-check-circle" onClick={(()=>this.doneTask(index, item))}></i>
              <span>{item.text}</span>
              <i className="fa fa-times-circle" onClick={(()=>this.deleteTask(index))}></i>
            </div>
          )
        })
        return TaskList
      break;
      case("DONE"):
        var TaskList = this.state.tasks.map((item, index) => {
          if (item.ifDone == true) {
            return (
              <div className={`task ${item.ifDone}`}>
                <i className="fa fa-check-circle" onClick={(()=>this.doneTask(index, item))}></i>
                <span>{item.text}</span>
                <i className="fa fa-times-circle" onClick={(()=>this.deleteTask(index))}></i>
              </div>
            )
          }
        })
        return TaskList
      break;
      case("ACTIVE"):
        var TaskList = this.state.tasks.map((item, index) => {
          if (item.ifDone == false) {
            return (
              <div className={`task ${item.ifDone}`}>
                <i className="fa fa-check-circle" onClick={(()=>this.doneTask(index, item))}></i>
                <span>{item.text}</span>
                <i className="fa fa-times-circle" onClick={(()=>this.deleteTask(index))}></i>
              </div>
            )
          }
        })
        return TaskList
      break;
      
    }
  }

  doneTask = (index, item) => {
    this.setState({
      tasks: [...this.state.tasks.slice(0, index),
              {id: Date.now(), text: item.text, ifDone: !item.ifDone},
              ...this.state.tasks.slice(index+1, this.state.tasks.length)]
    })
  }

  deleteTask = (index) => {
    this.setState({
      tasks: [...this.state.tasks.slice(0, index), ...this.state.tasks.slice(index+1, this.state.tasks.length)]
    })
  }

  reRender = (value) => this.setState({renderTasks: value})

  render() { 

  const counter = () => {
    let amount = 0
    this.state.tasks.forEach(item => {
      if (item.ifDone == false) {
        amount++
      }
    })
    return amount
  }

    return (
      <div className="main">
        <div className="header">
          <h1 className="header-title">Simple TODO-App</h1>
        </div>
        <div className="body">
          <form className="body-form" onSubmit={this.addNewTask}>
            <input type="text"/>
            <button>Add Task</button>
          </form>
          <h3 className="body-title">You have {counter()} active tasks...</h3>
          <div className="body-list">
            {this.renderTasks()}
          </div>
          <div className="body-btns">
            <div onClick={(()=>this.reRender("ALL"))}>All</div>
            <div onClick={(()=>this.reRender("DONE"))}>Done</div>
            <div onClick={(()=>this.reRender("ACTIVE"))}>Active</div>
          </div>
        </div>
      </div>
    )
  }
}


ReactDOM.render(<TodoApp />, document.getElementById('root'));

// {console.log(this.state.tasks)}
// {console.log(this.state.tasks[0])}
// {console.log(this.state.tasks[0].id)}
// {console.log(this.state.tasks[0].text)}
// {console.log(this.state.tasks[0].ifDone)}