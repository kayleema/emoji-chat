import React, {Component} from 'react';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendList: [],
            conversations: [],
        }
    }

    componentDidMount() {
        this.loadFriendList();
        this.loadConversationList();
    }

    loadFriendList() {
        fetch('/user-details/', {method: 'GET', credentials: "same-origin", cache: "no-cache",})
            .then(result => {
                return result.json();
            })
            .then(json => {
                this.setState({
                    friendList: json.friend
                });
            });
    }

    loadConversationList() {
        fetch('/conversations', {method: 'GET', credentials: "same-origin", cache: "no-cache",})
            .then(result => {
                return result.json();
            })
            .then(json => {
                console.log(json);
                this.setState({
                    conversations: json
                });
            });
    }

    selectConversation(conversation) {
        this.props.history.push("/chat/" + conversation.id)
    }

    render() {
        return (
            <div className="page">
                <h1>✉️</h1>
                <div className="post">
                    <button onClick={() => {
                        this.props.history.push('/message/new');
                    }}>🆕
                    </button>
                </div>
                <div className="post buttonList">
                    <h2>会話一覧</h2>
                    {this.state.conversations.map(conversation => (
                        <button
                            key={conversation.id}
                            onClick={() => this.selectConversation(conversation)}
                        >
                            {conversation.participant.map(user => user.name).join('・')}
                        </button>
                    ))}
                </div>
                <button onClick={() => {
                    this.props.history.push('/');
                }}>🔙
                </button>
            </div>
        )
    }
}
