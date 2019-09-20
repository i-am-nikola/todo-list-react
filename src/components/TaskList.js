import React, { Component } from 'react'
import TaskItem from './TaskItem'

class TaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1
    }
  }

  onChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? +value : +this.state.filterStatus
    )
  }

  render() {
    let { tasks } = this.props;
    let elementTask = tasks.map((task, index) => {
      return <TaskItem
        task={task}
        index={index}
        key={index}
        onUpdateStatus={this.props.onUpdateStatus}
        onDelete={this.props.onDelete}
        onUpdate={this.props.onUpdate}
      />
    })
    return (
      <table id="example1" className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Trạng thái</th>
            <th>Xử lý</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={this.state.filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={this.state.filterStatus}
                onChange={this.onChange}
              >
                <option value={-1}>Tất cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Hiện</option>
              </select>
            </td>
            <td></td>
          </tr>
          {elementTask}
        </tbody>
      </table>
    )
  }
}

export default TaskList;
