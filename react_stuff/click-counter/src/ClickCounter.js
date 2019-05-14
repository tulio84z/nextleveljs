import React ,{ Component }from 'react';
import logo from './logo.svg';
import './App.css';

class ClickCounter extends Component{
  constructor(props){
    super(props);
    this.state = {clicks: 0};
  }

  render(){
    return <div onClick={() => { this.setState({clicks: this.state.clicks +1 });}}>
        This div has been clicked {this.state.clicks} times.
      </div>
  }
}


export default ClickCounter;
