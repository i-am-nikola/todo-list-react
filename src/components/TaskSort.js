import React, { Component } from 'react'

class TaskSort extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'name',
      sortValue: 1
    }
  }

  onSort = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue);
    this.setState({
      sortBy, sortValue
    })
  }

  render() {
    let { sortBy, sortValue } = this.state;
    let selectedAZ = (sortBy === 'name' && sortValue === 1) ? 'selected' : '';
    let selectedZA = (sortBy === 'name' && sortValue === -1) ? 'selected' : '';
    let selectedActive = (sortBy === 'status' && sortValue === 1) ? 'selected' : '';
    let selectedInactive = (sortBy === 'status' && sortValue === -1) ? 'selected' : '';

    return (
      <div className="col-xs-4">
        <div className="btn-group">
          <button type="button" className="btn btn-primary">Sắp xếp</button>
          <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
            <span className="caret" />
          </button>
          <ul className="dropdown-menu" role="menu">
            <li onClick={() => this.onSort('name', 1)}><a href="\#" className={selectedAZ}>Tên A-Z</a></li>
            <li onClick={() => this.onSort('name', -1)}><a href="\#" className={selectedZA}>Tên Z-A</a></li>
            <li className="divider" />
            <li onClick={() => this.onSort('status', 1)}><a href="\#" className={selectedActive}>Trạng thái kích hoạt</a></li>
            <li onClick={() => this.onSort('status', -1)}><a href="\#" className={selectedInactive}>Trạng thái ẩn</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default TaskSort;
