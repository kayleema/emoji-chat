import React, {Component} from 'react';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
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
                console.log(json);
                window.location = '/login';
            });
    }

    render() {
        return (
            <div className="page">
                <div className="post">
                    <form className="register">
                        <p>
                            <label>ユーザー名: &nbsp;&nbsp;
                                <input
                                    type="text"
                                    onChange={e => this.setState({username: e.target.value})}
                                />
                            </label>
                        </p>
                        <p>
                            <label>パスワード: &nbsp;&nbsp;
                                <input
                                    type="password"
                                    onChange={e => this.setState({password: e.target.value})}
                                />
                            </label>
                        </p>
                        <p>
                            <label>パスワードもう一回: &nbsp;&nbsp;
                                <input
                                    type="password"
                                    onChange={e => this.setState({password2: e.target.value})}
                                />
                            </label>
                        </p>
                        <p>
                            <button onClick={this.onSubmit.bind(this)} type='submit'>次へ</button>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}
