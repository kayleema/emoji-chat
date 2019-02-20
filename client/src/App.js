import React, {Component} from 'react';
import logo from './smiling-cat-face-with-open-mouth.png';
import './App.css';
import Feed from "./Feed";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <Feed/>
            </div>
        );
    }
}

export default App;
