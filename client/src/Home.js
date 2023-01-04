import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ReactGA from "react-ga";


export default class Home extends Component {
    componentDidMount() {
        ReactGA.pageview("/home");
    }

    render() {
        return (
            <div className="page">
                <div className="post title">
                    <h1><strong>😺絵文字タイム</strong></h1>
                    <h1>絵文字の世界に<br/>入りましょう❗️</h1>
                    <h2>絵文字しか使えないSNS🌟</h2>
                </div>

                <div className="post title" style={{backgroundColor: '#3d361f'}}>
                    <p style={{textAlign: 'center'}}>
                        <Link to="/signin" className="buttonLink buttonTransparent">👋🙋💁 ログイン‍️</Link>
                    </p>
                    <p style={{textAlign: 'center'}}>
                        <Link to='/register' className="buttonLink buttonTransparent">🔰🆕🆔 新規会員登録</Link>
                    </p>
                </div>

                <div className="post title title2">
                    <h1>👩🏻‍💻 使っているテクノロジ 📡</h1>
                    <ul style={{textAlign: "left"}}>
                        <li>🍃 Java Spring Boot (JPA, Security, Websockets)</li>
                        <li>☕ Java Lombok</li>
                        <li>️⚛️ ReactJs, ReactRouter, Babel, Webpack</li>
                        <li>🏢 Emoji-Mart</li>
                        <li>🔌 Stomp Websockets</li>
                        <li>🧦 SockJS</li>
                        <li>👢 StompJS</li>
                        <li>🌩️ PWS</li>
                        <li>🐘 Postgres SQL on ElephantSQL</li>
                        <li>☁️ CloudFare</li>
                        <li>💁 SASS</li>
                    </ul>
                </div>
            </div>
        )
    }
}
