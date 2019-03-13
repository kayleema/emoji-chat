import React, {Component} from 'react';
import 'emoji-mart/css/emoji-mart.css'
import EmojiInputBox from "./EmojiInputBox";
import Post from "./Post";
import ReactGA from "react-ga";
import Spinner from "./Spinner";
import {FeedSocket} from "./websocketUtils";

export default class Feed extends Component {
    constructor(props) {
        super(props);

        this.client = null;

        this.state = {
            posts: [],
            message: '',
            loading: true,
        };

        this.feedSocket = new FeedSocket();
    }

    componentDidMount() {
        this.getPosts();
        this.realtimeSetup();
        ReactGA.pageview('/');
    }

    componentWillUnmount() {
        this.feedSocket.setConnectCallback(null);
        this.feedSocket.setDisconnectCallback(null);
        this.feedSocket.setNewPostCallback(null);
        this.feedSocket.deactivate();
    }

    getPosts() {
        const headers = {};
        fetch('/api/posts', {method: 'GET', headers, credentials: "same-origin", cache: "no-cache",})
            .then(response => {
                if (response.status !== 200) {
                    this.props.history.push('/home');
                }
                return response.json();
            })
            .then((data) => (data._embedded.posts))
            .then(posts => this.setState({
                loading: false,
                posts: posts.sort((a, b) => (a.createdDate > b.createdDate) ? -1 : 1)
            }));
    }

    newPostMessage(message) {
        console.log(message);
        this.getPosts();
    }

    onSocketConnect(frame) {
        this.setState({connected: true, error: false});
    }

    onSocketDisconnect() {
        this.setState({connected: false});
    }

    realtimeSetup() {
        this.feedSocket.setConnectCallback(this.onSocketConnect.bind(this));
        this.feedSocket.setDisconnectCallback(this.onSocketDisconnect.bind(this));
        this.feedSocket.setNewPostCallback(this.newPostMessage.bind(this));
        this.feedSocket.connect();
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.message === '') {
            return;
        }

        const body = JSON.stringify({
            "text": this.state.message,
            "subject": "user1"
        });
        const headers = {'Content-Type': 'application/json'};
        fetch('/api/posts', {
            method: 'POST', headers, body, credentials: "same-origin", cache: "no-cache"
        })
            .then(() => {
                this.setState({
                    message: ''
                });
                this.getPosts();
            })
    }

    onSelectEmoji(emoji) {
        this.setState({
            message: this.state.message + emoji.native,
        });
    }

    render() {
        return [
            <div>
                {this.state.connected && (
                    <div className="status success fadeout">
                        接続されました
                    </div>
                )}
                {!this.state.connected && (
                    <div className="status info">
                        接続中
                    </div>
                )}
                {this.state.error && (
                    <div className="status error fadeout">
                        エラー
                    </div>
                )}
            </div>,
            <div className="page">
                <h2>🌏グローバル掲示板</h2>
                <div className="post">
                    <EmojiInputBox
                        onSelectEmoji={this.onSelectEmoji.bind(this)}
                        value={this.state.message}
                        buttonText="📤📬📡"
                        onClear={() => this.setState({message: ''})}
                        onButtonClick={this.onSubmit.bind(this)}
                    />
                </div>
                <div className="post">
                    {this.state.posts.map((post, index) => (
                        <Post key={index} post={post} history={this.props.history}/>
                    ))}
                    {(this.state.loading) && <Spinner/>}
                </div>
            </div>
        ];
    }
}