import React, { Component } from 'react'

class TaskSearch extends Component {

  constructor(props){
    super(props);
    this.state = {
      keyword: ''
    }
  }

  onSearch = () => {
    let {keyword} = this.state;
    this.props.onSearch(keyword);
  }

  render() {
    
    return (
      <div className="col-xs-8">
        <div className="input-group">
          <input type="text" className="form-control" onChange={e => this.setState({keyword: e.target.value.toLowerCase()})} />
          <span className="input-group-btn">
            <button type="button" className="btn btn-primary" onClick={this.onSearch}>Tìm</button>
          </span>
        </div>
      </div>
    )
  }
}

export default TaskSearch;
