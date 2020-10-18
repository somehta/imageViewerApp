import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './screens/login/Login';
import Home from './screens/home/Home';

class App extends Component {
  constructor() {
    super();
    this.baseUrl = "https://graph.instagram.com/";
  }

  render (){
    return (
     <Router>
       <div>
         <Route exact path ="/" render={({history}, props) =><Login history ={history} {...props}/>}/>
         <Route exact path="/home" render={({history},props) =><Home history ={history} {...props} baseUrl={this.baseUrl}/>}/>
       </div>
       </Router>
    )
  }
}

export default App;
