import React, {Component} from 'react';
import EmojiInputBox from "./EmojiInputBox";


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
        fetch('/registration', {method: 'POST', headers, body})
            .then(result => result.json())
            .then(json => {
                this.props.history.push('/signin')
            });
    }

    render() {
        return (
            <div className="page">
                <div className="post">
                    <label>🆔📛📇→&nbsp;&nbsp;
                    </label>
                    <EmojiInputBox
                        value={this.state.username}
                        onSelectEmoji={emoji => this.setState({username: this.state.username + emoji.native})}
                        onClear={e => this.setState({username: ''})}
                    />
                </div>
                <div className="post">
                    <label>🤐🤫㊙️→&nbsp;&nbsp;
                    </label>
                    <EmojiInputBox
                        value={this.state.password}
                        onSelectEmoji={emoji => this.setState({password: this.state.password + emoji.native})}
                        onClear={e => this.setState({password: ''})}
                    />
                </div>
                <div className="post">
                    <button onClick={this.onSubmit.bind(this)} type='submit'>✨🏃✨</button>
                </div>
            </div>
        )
    }
}
