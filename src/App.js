import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEdit: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sort: {
        by: 'name',
        value: 1
      }
    };

  }

  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks
      });
    }
  }

  onGenerateData = () => {
    let tasks = [
      {
        id: this.generateId(),
        name: 'ReactJS',
        status: true
      },
      {
        id: this.generateId(),
        name: 'AngularJS',
        status: true
      },
      {
        id: this.generateId(),
        name: 'VueJS',
        status: false
      }
    ];

    this.setState({
      tasks
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateId() {
    return this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
      + this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
      + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  onToggleForm = () => {
    const { isDisplayForm, taskEdit } = this.state;
    if (isDisplayForm && taskEdit !== null) {
      this.setState({
        isDisplayForm: true,
        taskEdit: null
      })
    } else {
      this.setState({
        isDisplayForm: !isDisplayForm,
        taskEdit: null
      })
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    })
  }

  onSubmit = data => {
    const { tasks } = this.state;

    if (data.id === '') {
      tasks.push({
        id: this.generateId(),
        name: data.name,
        status: data.status
      })
    } else {
      let index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({ tasks, taskEdit: null })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    let index = this.findIndex(id);
    let { tasks } = this.state;

    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks
      })
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  findIndex = id => {

    let { tasks } = this.state
    let result = -1
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    })
    return result;
  }

  onDelete = id => {
    let index = this.findIndex(id);
    let { tasks } = this.state;
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.onCloseForm();
  }

  onOpenForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onUpdate = id => {
    let index = this.findIndex(id);
    let { tasks } = this.state;
    let taskEdit = tasks[index];
    this.setState({
      taskEdit: taskEdit
    })
    this.onOpenForm();
  }

  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }

  onSearch = keyword => {
    this.setState({
      keyword
    })

  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue
      }
    })
  }

  render() {
    let { tasks, isDisplayForm, taskEdit, filter, keyword, sort } = this.state;

    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }
      tasks = tasks.filter(task => {
        if (filter.status === -1) {
          return task
        } else {
          return task.status === (filter.status === 1 ? true : false)
        }
      })
    };
    if (keyword) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword) !== -1
      })
    }

    if (sort.by === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -(sort.value);
        else return 0
      })
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        else if (a.name < b.name) return sort.value;
        else return 0
      })
    }


    const elementForm = isDisplayForm
      ? <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        taskEdit={taskEdit}
      />
      : '';

    return (
      <div className="container" >
        <div className="row">
          <div className="header text-center">
            <h1>QUẢN LÝ CÔNG VIỆC</h1>
          </div>
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-3' : ''}>
            {elementForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-9' : 'col-xs-12'}>
            <div className="box box-primary">
              <div className="box-header row">
                <div className="btn-group col-xs-5">
                  <button className="btn btn-primary" onClick={this.onToggleForm}>Thêm công việc</button>
                  <button className="btn btn-warning" onClick={this.onGenerateData}>Generate Data</button>
                </div>
                <TaskControl onSearch={this.onSearch} onSort={this.onSort} />
              </div>
              <div className="box-body">
                <TaskList tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
