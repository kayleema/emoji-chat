import React, {Component} from 'react';

export default class Post extends Component {
    constructor(props) {
        super(props);
    }

    clickAuthor() {
        this.props.history.push('/username-redirect/' + this.props.post.createdBy);
    }

    render() {
        return (
            <div className="post">
                <span
                    className="author"
                    onClick={this.clickAuthor.bind(this)}
                >
                    {this.props.post.createdBy}
                </span>
                ：
                {this.props.post.text}
            </div>
        )
    }
}
