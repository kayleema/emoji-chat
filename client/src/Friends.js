import React, {Component} from 'react';
import EmojiInputBox from "./EmojiInputBox";


export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            friendList: []
        }
    }

    componentDidMount() {
        this.loadFriendList();
    }

    loadFriendList() {
        fetch('/user-details/', {method: 'GET', credentials: "same-origin", cache: "no-cache",})
            .then(result => {
                if (result.status !== 200) {
                    this.props.history.push('signin');
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

    onSearch(e) {
        e.preventDefault();
        this.setState({search: ''});
        fetch('/user-search/' + this.state.search,
            {method: 'GET', credentials: "same-origin", cache: "no-cache"})
            .then(result => {
                if (result.status === 200) {
                    return result.json();
                } else {
                    this.setState({
                        searchResults: []
                    });
                }
            })
            .then(json => {
                console.log(json);
                if (json) {
                    this.setState({
                        searchResults: [json]
                    });
                }
            });
    }

    onClickAddFriend(username) {
        const body = JSON.stringify({username});
        const headers = {'Content-Type': 'application/json'};
        fetch('/add-friend', {method: 'POST', headers, body, credentials: "same-origin", cache: "no-cache",})
            .then(() => {
                this.setState({
                    searchResults: undefined
                });
                this.loadFriendList();
            })
    }

    render() {
        return (
            <div className="page">
                <h1>👭👫👬</h1>
                <div className="post">
                    <h2>📇 友達一覧</h2>
                    <div className="post">
                        <ul>
                            {this.state.friendList.map(friend => (
                                <li>{friend.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="post">
                    <h2>🔎 友達追加</h2>
                    <EmojiInputBox
                        value={this.state.search}
                        onSelectEmoji={emoji => this.setState({search: this.state.search + emoji.native})}
                        onClear={e => this.setState({search: ''})}
                        buttonText="🕵🏻‍♀️🔍"
                        onButtonClick={this.onSearch.bind(this)}
                    />
                    {(this.state.searchResults && this.state.searchResults.length > 0) && (
                        <div className="post">
                            {this.state.searchResults.map((user) => (
                                <p key={user.name}>
                                    {user.name}&nbsp;&nbsp;
                                    <button onClick={() => this.onClickAddFriend(user.name)}>➕👫追加</button>
                                </p>
                            ))}
                        </div>
                    )}
                    {(this.state.searchResults && this.state.searchResults.length === 0) && (
                        <div className="post">
                            <p className="error">
                                🙅🈳💨🈚
                            </p>
                        </div>
                    )}
                </div>
                <button onClick={() => {
                    this.props.history.push('/');
                }}>🔙
                </button>
            </div>
        )
    }
}
