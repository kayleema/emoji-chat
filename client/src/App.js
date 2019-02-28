import React, {Component} from 'react';
import logo from './smiling-cat-face-with-open-mouth.png';
import './App.css';
import Feed from "./Feed";
import {BrowserRouter, Route} from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Friends from "./Friends";
import Message from "./Message";
import MessageNew from "./MessageNew";
import Chat from "./Chat";

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <a href="#" onClick={() => { window.location = '/' }}>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </a>
                    <a href="#" onClick={() => { window.location = '/' }}>
                        <span>絵文字タイム</span>
                    </a>
                </header>
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Feed}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/signin' component={Login}/>
                        <Route exact path='/friend' component={Friends}/>
                        <Route exact path='/message' component={Message}/>
                        <Route path='/chat/:id' component={Chat}/>
                        <Route exact path='/message/new' component={MessageNew}/>
                    </div>
                </BrowserRouter>
                <p></p>
            </div>
        );
    }
}

export default App;
