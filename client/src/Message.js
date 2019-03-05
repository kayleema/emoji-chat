import React, {Component} from 'react';
import ReactGA from "react-ga";
import Spinner from "./Spinner";

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendList: [],
            conversations: [],
            loading: true,
        }
    }

    componentDidMount() {
        this.loadFriendList();
        this.loadConversationList();
        ReactGA.pageview("/message");
    }

    loadFriendList() {
        fetch('/user-details/', {method: 'GET', credentials: "same-origin", cache: "no-cache",})
            .then(result => {
                if (result.status === 401) {
                    this.props.history.push('/signin');
                    return;
                }
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
                    conversations: json,
                    loading: false,
                });
            });
    }

    selectConversation(conversation) {
        this.props.history.push("/chat/" + conversation.id)
    }

    render() {
        return (
            <div className="page">
                <h1>🗣チャット</h1>

                <div className="post">
                    <button onClick={() => {
                        this.props.history.push('/message/new');
                    }}>🆕 新しいチャットを作る ✨
                    </button>
                </div>
                <div className="post buttonList">
                    <h2>チャット一覧</h2>
                    {this.state.loading && <Spinner/>}
                    {this.state.conversations.map(conversation => (
                        <button
                            key={conversation.id}
                            onClick={() => this.selectConversation(conversation)}
                        >
                            👥参加者：{conversation.participant.map(user => user.name).join('・')}
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
