import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link
                    className="friendIcon"
                    to={'/username-redirect/' + this.props.post.createdBy}
                >
                    {this.props.post.createdBy}
                </Link>
                ：
                {this.props.post.text}
            </div>
        )
    }
}
