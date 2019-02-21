import React, {Component} from 'react';
import {Link} from "react-router-dom";


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
                        <Link to='/register'>新しい会計を作る</Link>
                    </p>
                </div>
            </div>
        )
    }
}
