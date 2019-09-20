import React, { Component } from 'react'
import TaskSearch from './TaskSearch'
import TaskSort from './TaskSort'

class TaskControl extends Component {
  render() {
    return (
      <div className="col-md-7">
        <div className="row">
          <TaskSearch onSearch={this.props.onSearch} />
          <TaskSort onSort={this.props.onSort} />
        </div>
      </div>
    )
  }
}

export default TaskControl;
