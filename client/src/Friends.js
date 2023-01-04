import React, {Component} from 'react';
import EmojiInputBox from "./EmojiInputBox";
import ReactGA from "react-ga";
import Spinner from "./Spinner";
import {Link} from "react-router-dom";


export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            friendList: [],
            loading: true,
            loadingSearch: false,
        }
    }

    componentDidMount() {
        this.loadFriendList();
        ReactGA.pageview("/friend");
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
                    friendList: json.friend,
                    loading: false,
                });
            });
    }

    onSearch(e) {
        e.preventDefault();
        this.setState({
            search: '',
            loadingSearch: true
        });
        fetch('/user-search/' + this.state.search,
            {method: 'GET', credentials: "same-origin", cache: "no-cache"})
            .then(result => {
                if (result.status === 200) {
                    return result.json();
                } else {
                    this.setState({
                        searchResults: [],
                        loadingSearch: false
                    });
                }
            })
            .then(json => {
                console.log(json);
                if (json) {
                    this.setState({
                        searchResults: [json],
                        loadingSearch: false
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
                        {this.state.friendList.map(friend => (
                            <Link to={`/user/${friend.id}`} className="friendIcon" key={friend.id}>{friend.name}</Link>
                        ))}
                        {this.state.loading && <Spinner/>}
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
                    <div className="post">
                        {(this.state.searchResults && this.state.searchResults.length > 0) && (
                            this.state.searchResults.map((user) => (
                                <p key={user.name}>
                                    {user.name}&nbsp;&nbsp;
                                    <button onClick={() => this.onClickAddFriend(user.name)}>➕👫追加</button>
                                </p>
                            ))
                        )}
                        {(this.state.searchResults && this.state.searchResults.length === 0) && (
                            <p className="error">
                                🙅🈳💨🈚
                            </p>
                        )}
                        {this.state.loadingSearch && <Spinner/>}
                    </div>
                </div>
                <button onClick={() => {
                    this.props.history.push('/');
                }}>🔙
                </button>
            </div>
        )
    }
}
