import React, {Component} from 'react';
import {formatDate} from "./utils";


export default class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="post">
                <span class="author">
                    {this.props.post.createdBy}
                </span>
                ：
                {this.props.post.text}
            </div>
        )
    }
}
