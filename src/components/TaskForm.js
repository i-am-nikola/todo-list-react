import React, { Component } from 'react';

class TaskForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: '',
      name: '',
      status: true
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.props.onCloseForm();
    this.onClearForm();
  }

  onClearForm = () => {
    this.setState({
      name: '',
      status: true
    })
  }

  componentDidMount() {
    if (this.props.taskEdit) {
      let { taskEdit } = this.props;
      this.setState({
        id: taskEdit.id,
        name: taskEdit.name,
        status: taskEdit.status
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      id: '',
      name: '',
      status: true
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    if (nextProps && nextProps.taskEdit) {
      let { taskEdit } = nextProps;
      this.setState({
        id: taskEdit.id,
        name: taskEdit.name,
        status: taskEdit.status
      })
    } else {
      this.setState({
        id: '',
        name: '',
        status: true
      })
    }
  }

  render() {

    let title = this.state.id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'

    return (
      <div className="box box-primary">
        <div className="box-header with-border">
          <span className="btn pull-right cursor" onClick={this.props.onCloseForm}><i className="fa fa-close"></i></span>
          <h3 className="box-title">{title}</h3>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="box-body">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Tên công việc</label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Trạng thái</label>
              <select className="form-control select2" name="status" value={this.state.status} onChange={e => this.setState({ status: e.target.value === 'true' ? true : false })}>
                <option value={true}>Kích hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
            </div>
          </div>
          <div className="box-footer">
            <button type="submit" className="btn btn-primary">Lưu</button>&nbsp;
            <button type="button" className="btn btn-default" onClick={this.onClearForm}>Hủy</button>
          </div>
        </form>
      </div>

    )
  }
}

export default TaskForm;
