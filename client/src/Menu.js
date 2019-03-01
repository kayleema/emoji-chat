import {Link, Route} from "react-router-dom";
import React, {Component} from 'react';
import logo from './smiling-cat-face-with-open-mouth.png';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }
    }

    closeMenu() {
        this.setState({showMenu: false});
    }

    render() {
        return (<div className="App-header-body-spacer">

            <header className="App-header">
                <div className="pad">
                    <Link to="/" onClick={this.closeMenu.bind(this)}>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </Link>
                    <Link to="/" onClick={this.closeMenu.bind(this)}>
                        <span>絵文字タイム</span>
                    </Link>
                    <a className={`hamburger ${this.state.showMenu ? "change" : ""}`} href="#" onClick={e => {
                        e.preventDefault();
                        this.setState({showMenu: !this.state.showMenu});
                    }}>
                        <div className="bar1"/>
                        <div className="bar2"/>
                        <div className="bar3"/>
                    </a>
                </div>
                {this.state.showMenu && (
                    <div className="menu">
                        <ul>
                            <li><Link to="/friend" onClick={this.closeMenu.bind(this)}>👫 友達</Link></li>
                            <li><Link to="/message" onClick={this.closeMenu.bind(this)}>🗣 チャット</Link></li>
                            <li><Link to="/me" onClick={this.closeMenu.bind(this)}>👤 私のアカウント</Link></li>
                            <li>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    this.closeMenu();
                                    fetch('/logout', {
                                        method: 'POST',
                                        credentials: "same-origin",
                                        cache: "no-cache",
                                    })
                                        .then(() => {
                                            window.location = '/home';
                                        });
                                }}>
                                    👋 ログアウト
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </header>

            {this.state.showMenu && (
                <div className="cover" onClick={this.closeMenu.bind(this)}/>
            )}
        </div>);
    }
}