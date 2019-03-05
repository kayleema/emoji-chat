import React, {Component} from 'react';
import 'emoji-mart/css/emoji-mart.css'
import EmojiInputBox from "./EmojiInputBox";
import Post from "./Post";
import ReactGA from "react-ga";
import Spinner from "./Spinner";

const SockJS = require('sockjs-client'); // <1>
const StompJs = require('@stomp/stompjs'); // <2>

export default class Feed extends Component {
    constructor(props) {
        super(props);

        this.client = null;

        this.state = {
            posts: [],
            message: '',
            loading: true,
        }
    }

    componentDidMount() {
        this.getPosts();
        this.realtimeSetup();
        ReactGA.pageview('/');
    }

    componentWillUnmount() {
        this.client.deactivate();
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
        console.log('connected', frame);

        let subscription = this.client.subscribe('/topic/newPost', this.newPostMessage.bind(this));
        console.log('subscription', subscription);
    }

    realtimeSetup() {
        const hostname = window.location.hostname;
        let ws;
        if (hostname === 'emoji.kaylee.jp') {
            ws = new SockJS(`https://${hostname}:4443/posts`)
        } else {
            ws = new SockJS('/posts');
        }
        this.client = StompJs.Stomp.over(ws);

        this.client.onConnect = this.onSocketConnect.bind(this);

        this.client.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        this.client.activate();
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
        return (
            <div className="page">
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
        );
    }
}