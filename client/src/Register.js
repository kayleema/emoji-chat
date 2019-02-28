import React, {Component} from 'react';
import EmojiInputBox from "./EmojiInputBox";
import {Link} from "react-router-dom";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            success: false,
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const body = JSON.stringify({
            "username": this.state.username,
            "password": this.state.password
        });
        const headers = {'Content-Type': 'application/json'};
        fetch('/registration', {
            method: 'POST', headers, body, credentials: "same-origin", cache: "no-cache"
        })
            .then(result => result.json())
            .then(json => {
                this.setState({success: true});
                // this.props.history.push('/signin')
            });
    }

    render() {
        if (this.state.success) {
            return (
                <div className="page">
                    <h1 className="hanamaru">✨💮✨</h1>
                    <Link to='/signin'>💁 ログイン</Link>
                </div>
            )
        }
        return (
            <div className="page">
                <h1>アカウント作成</h1>
                <div className="post">
                    <label>🆔📛📇
                    </label>
                    <EmojiInputBox
                        value={this.state.username}
                        onSelectEmoji={emoji => this.setState({username: this.state.username + emoji.native})}
                        onClear={e => this.setState({username: ''})}
                    />
                </div>
                <div className="post">
                    <label>暗号🤐🤫㊙️
                    </label>
                    <EmojiInputBox
                        value={this.state.password}
                        onSelectEmoji={emoji => this.setState({password: this.state.password + emoji.native})}
                        onClear={e => this.setState({password: ''})}
                    />
                </div>
                <div className="post">
                    <button onClick={this.onSubmit.bind(this)} type='submit'>✨🏃✨・アカウント作成</button>
                </div>
            </div>
        )
    }
}
