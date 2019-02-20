import React, { Component } from 'react';

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts : [],
            message : ''
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        fetch('/api/posts')
            .then(response =>  response.json())
            .then((data) => (data._embedded.posts))
            .then(posts => this.setState({
                posts: posts
            }));
    }

    onSubmit() {
        const body = JSON.stringify({
            "text": this.state.message,
            "subject": "user1"
        });
        const headers = {'Content-Type': 'application/json'};
        fetch('/api/posts', {method: 'POST', headers, body})
            .then(() => {
                this.setState({
                    message: ''
                })
                this.getPosts()
            })
    }

    onChangeMessage(event) {
        this.setState({message: event.target.value});
    }

    render() {
        return (
            <div className="feed">
                <div className="post">
                    <input
                        onChange={this.onChangeMessage.bind(this)}
                        type="text"
                        value={this.state.message}
                    />
                    <button onClick={this.onSubmit.bind(this)}>　➡︎　</button>
                </div>
                {this.state.posts.map((post, index) => (
                    <div key={index} className="post">
                        {post.text}
                    </div>
                ))}
            </div>
        );
    }
}