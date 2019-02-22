import React, {Component} from 'react';
import {Link} from "react-router-dom";

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
                <div className="post">
                    <form className="register" onSubmit={this.onSubmit.bind(this)} action="/login" method="post">
                        {this.state.error && (
                            <p className="error">
                                ⚠️😱⚠️
                            </p>
                        )}
                        <p>
                            <label>🆔🧑📛📇→ &nbsp;&nbsp;
                                <input
                                    type="text"
                                    name="username"
                                    onChange={e => this.setState({username: e.target.value})}
                                />
                            </label>
                        </p>
                        <p>
                            <label>🤐🤫㊙️→&nbsp;&nbsp;
                                <input
                                    type="password"
                                    name="password"
                                    onChange={e => this.setState({password: e.target.value})}
                                />
                            </label>
                        </p>
                        <p>
                            <button type='submit'>🏃☺️</button>
                        </p>
                        <p>
                            <Link to='/register' className="buttonLink">🔰😕</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}
