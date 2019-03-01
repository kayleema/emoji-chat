import React, {Component} from 'react';
import EmojiInputBox from "./EmojiInputBox";


export default class MessageNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendList: [],
            friendSelection: undefined,
            participantList: [],
        }
    }

    componentDidMount() {
        this.loadFriendList();
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

    onChangeFriendSelection(e) {
        const id = e.target.value;
        const friend = this.state.friendList.find(friend => friend.id.toString() === id);
        console.log(friend);
        this.setState({friendSelection: friend});
    }

    onAddUser() {
        this.setState({participantList: [...this.state.participantList, this.state.friendSelection]})
    }

    onClickContinue() {
        const body = JSON.stringify({
            participants: this.state.participantList.map(participant => participant.id)
        });
        const headers = {'Content-Type': 'application/json'};
        fetch('/new-conversation', {method: 'POST', body, headers, credentials: "same-origin", cache: "no-cache",})
            .then(result => {
                return result.json();
            })
            .then(json => {
                console.log(json);
                this.props.history.push(`/chat/${json.id}`);
            });
    }

    render() {
        return (
            <div className="page">
                <h1>🗣 新しいチャット</h1>

                <div className="post">
                    <label>➕🆔追加</label>
                    <div className="selectContainer">
                        <select name="friend" onChange={this.onChangeFriendSelection.bind(this)}>
                            <option>洗濯してください</option>
                            {this.state.friendList.map((friend) => (
                                <option key={friend.id} value={friend.id}>{friend.name}</option>
                            ))}
                        </select>
                        <button
                            onClick={this.onAddUser.bind(this)}
                            disabled={this.state.friendSelection === undefined}
                        >➕
                        </button>
                    </div>
                    <div className="post">
                        {this.state.participantList.length === 0 && "〜"}
                        <ul>
                            {this.state.participantList.map(participant => (
                                <li key={participant.name}>{participant.name}</li>
                            ))}
                        </ul>
                    </div>
                    <p>
                        {this.state.participantList.length > 0 && (
                            <button onClick={this.onClickContinue.bind(this)}>次▶️</button>
                        )}
                    </p>
                </div>
                <button onClick={() => {
                    this.props.history.push('/message');
                }}>🔙
                </button>
            </div>
        )
    }
}
