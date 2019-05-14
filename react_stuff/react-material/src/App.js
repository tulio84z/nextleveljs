import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import NavBar from './navbar'
import Content from './Content'
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppBar color="primary" position="static">
      <Toolbar>
        <TypoGraphy 
          variant="title"
          color="inherit"
          >
          My Header
        </TypoGraphy>
        <NavBar></NavBar>
      </Toolbar>
        
      </AppBar>
      <Content></Content>
    </Router>
  );
}

export default App;
