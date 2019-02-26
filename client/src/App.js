import React, {Component} from 'react';
import logo from './smiling-cat-face-with-open-mouth.png';
import './App.css';
import Feed from "./Feed";
import {BrowserRouter, Route} from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Friends from "./Friends";

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img onClick={() => {window.location = '/'}} src={logo} className="App-logo" alt="logo" />絵文字タイム
                </header>
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Feed} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/home' component={Home} />
                        <Route exact path='/signin' component={Login} />
                        <Route exact path='/friend' component={Friends} />
                    </div>
                </BrowserRouter>
                <p></p>
            </div>
        );
    }
}

export default App;
