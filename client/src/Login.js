import React, {Component} from 'react';
import {Link} from "react-router-dom";
import EmojiInputBox from "./EmojiInputBox";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false,
        }
    }

    onSubmit(e) {
        console.log(e.target);
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData);
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);

        const body = "username=" + this.state.username + "&password=" + this.state.password;

        const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        fetch('/login', {method: 'POST', headers, body})
            .then(result => {
                if (result.status === 200) {
                    this.props.history.push('/');
                } else {
                    this.setState({error: true});
                }
            });
    }

    render() {
        return (
            <div className="page">
                <form className="register" onSubmit={this.onSubmit.bind(this)} action="/login" method="post">
                    {this.state.error && (
                        <div className="post">
                            <p className="error">
                                ⚠️😱⚠️
                            </p>
                        </div>
                    )}
                    <div className="post">
                        <label>🆔🧑📛📇
                        </label>
                        <EmojiInputBox
                            value={this.state.username}
                            onSelectEmoji={e => this.setState({username: this.state.username + e.native})}
                            onClear={e => this.setState({username: ''})}
                        />
                    </div>
                    <div className="post">
                        <label>🤐🤫㊙️→&nbsp;&nbsp;
                        </label>
                        <EmojiInputBox
                            value={this.state.password}
                            onSelectEmoji={e => this.setState({password: this.state.password + e.native})}
                            onClear={e => this.setState({password: ''})}
                        />
                    </div>
                    <div className="post">
                        <p>
                            <button type='submit'>🏃☺️</button>
                        </p>
                        <p>
                            <Link to='/register' className="buttonLink">🔰😕</Link>
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}
