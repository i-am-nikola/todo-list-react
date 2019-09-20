import React, { Component } from 'react'

class TaskItem extends Component {

  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id)
  }

  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  }

  onUpdate = () => {
    this.props.onUpdate(this.props.task.id);
  }

  render() {
    const { task, index } = this.props;
    const className = task.status ? 'success' : 'danger'
    const status = task.status ? 'Kích hoạt' : 'Ẩn'
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span className={`btn label label-${className}`} onClick={this.onUpdateStatus} >{status}</span>
        </td>
        <td>
          <button className="btn btn-success mr-3" onClick={this.onUpdate}><i className="fa fa-edit"></i></button>&nbsp;
          <button className="btn btn-danger" onClick={this.onDelete}><i className="fa fa-trash"></i></button>
        </td>
      </tr>
    )
  }
}

export default TaskItem;
