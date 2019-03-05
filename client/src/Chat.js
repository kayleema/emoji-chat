import React, {Component} from 'react';
import ChatSocket from "./websocketUtils";
import EmojiInputBox from "./EmojiInputBox";
import ReactGA from "react-ga";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            messageToSend: "",
            connecting: true,
            disconnected: false,
        };
        this.chatSocket = new ChatSocket();
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.chatSocket.setNewMessageCallback(this.newMessage.bind(this));
        this.chatSocket.setChatInitializerCallback(this.chatInitializerCallback.bind(this));
        this.chatSocket.setConnectCallback(this.chatConnectCallback.bind(this));
        this.chatSocket.setDisconnectCallback(this.chatDisconnectCallback.bind(this));
        this.chatSocket.connect(id);
        ReactGA.pageview("/chat");
    }

    newMessage(message) {
        console.log('new message received', message);
        this.setState({
            messages: [message, ...this.state.messages]
                .sort((a, b) => (a.createdDate > b.createdDate) ? -1 : 1)
        });
    }

    chatInitializerCallback(message) {
        console.log('chat init', message);
        const messageList = message.messageList;
        this.setState({
            messages: messageList
                .sort((a, b) => (a.createdDate > b.createdDate) ? -1 : 1)
        });
    }

    chatConnectCallback() {
        this.setState({connecting: false, disconnected: false})
    }

    chatDisconnectCallback() {
        console.log('disconnexcteddddddd! 大変〜')
        this.setState({disconnected: true});
    }

    onSendMessage() {
        this.chatSocket.sendMessage(this.state.messageToSend);
        this.setState({messageToSend: ''});
    }

    render() {
        return (
            <div className="page">
                <h1>🗣チャット</h1>

                <div className="post">
                    <EmojiInputBox
                        value={this.state.messageToSend}
                        onSelectEmoji={emoji => this.setState({messageToSend: this.state.messageToSend + emoji.native})}
                        onClear={e => this.setState({messageToSend: ''})}
                        buttonText="🗣"
                        onButtonClick={this.onSendMessage.bind(this)}
                    />
                </div>
                <div className="post">
                    {this.state.disconnected && (
                        <div className="postHeader error">つながっていません</div>
                    )}
                    {this.state.connecting && (
                        <div className="postHeader info">Ｃｏｎｎｅｃｔｉｎｇ…</div>
                    )}
                    {!this.state.connecting && !this.state.disconnected && (
                        <div className="postHeader success">繋がっています</div>
                    )}
                    {this.state.messages.map(message =>
                        <p key={message.id}>
                            <span className="author">{message.from.name}</span>
                            ：{message.text}
                        </p>
                    )}
                </div>
            </div>
        )
    }
}
