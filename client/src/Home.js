import React, {Component} from 'react';


export default class Home extends Component {
    render() {
        return (
            <div className="page">
                <div className="post">
                    <h1>ログインされていません</h1>
                    <p>
                        <a href="/login">ログイン</a>
                    </p>
                    <p>
                        <a href='/register'>新しい会計を作る</a>
                    </p>
                </div>
            </div>
        )
    }
}
