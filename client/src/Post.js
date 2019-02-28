import React, {Component} from 'react';

export default class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="post">
                <span className="author">
                    {this.props.post.createdBy}
                </span>
                ：
                {this.props.post.text}
            </div>
        )
    }
}
