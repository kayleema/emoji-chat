import React, {Component} from 'react';
import './App.scss';
import Feed from "./Feed";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Friends from "./Friends";
import Message from "./Message";
import MessageNew from "./MessageNew";
import Chat from "./Chat";
import Menu from "./Menu";
import ReactGA from 'react-ga';
import Profile from "./Profile";
import Me from "./Me";
import UsernameRedirect from "./UsernameRedirect";

ReactGA.initialize('UA-52221111-4');

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path='/home' component={() => null} />
                            <Route exact path='/signin' component={() => null} />
                            <Route exact path='/register' component={() => null} />
                            <Route path='/' component={Menu} />
                        </Switch>
                        <Route exact path='/' component={Feed}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/signin' component={Login}/>
                        <Route exact path='/friend' component={Friends}/>
                        <Route exact path='/message' component={Message}/>
                        <Route path='/chat/:id' component={Chat}/>
                        <Route path='/user/:id' component={Profile}/>
                        <Route path='/me' component={Me}/>
                        <Route path='/username-redirect/:username' component={UsernameRedirect}/>
                        <Route exact path='/message/new' component={MessageNew}/>
                    </div>
                </BrowserRouter>
                <p></p>
            </div>
        );
    }
}

export default App;
