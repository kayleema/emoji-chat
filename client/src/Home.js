import React, {Component} from 'react';
import {Link} from "react-router-dom";


export default class Home extends Component {
    render() {
        return (
            <div className="page">
                <div className="post title">
                    <h1>絵文字の世界に<br/>入りましょう❗️</h1>
                    <h2>絵文字しか使えないSNS🌟</h2>
                </div>
                <div className="post">
                    <p style={{textAlign: 'center'}}>
                        <Link to="/signin" className="buttonLink">👋🙋💁・ログイン‍️</Link>
                    </p>
                    <p style={{textAlign: 'center'}}>
                        <Link to='/register' className="buttonLink">🔰🆕👤🆔・新しい方</Link>
                    </p>
                </div>
            </div>
        )
    }
}
