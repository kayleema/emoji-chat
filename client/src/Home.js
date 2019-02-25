import React, {Component} from 'react';
import {Link} from "react-router-dom";


export default class Home extends Component {
    render() {
        return (
            <div className="page">
                <div className="post">
                    <p>
                        <Link to="/signin" className="buttonLink">👋🙋💁‍️</Link>
                        <Link to='/register' className="buttonLink">✨🔰🆕👤🆔🔰✨</Link>
                    </p>
                </div>
            </div>
        )
    }
}
