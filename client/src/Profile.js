import React, {Component} from 'react';
import ReactGA from "react-ga";
import UserRepository from "./UserRepository";
import Spinner from "./Spinner";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null,
            myDetails: null
        };

        this.userDetailsRepo = new UserRepository();
    }

    componentDidMount() {
        ReactGA.pageview(`/user/${this.props.match.params.id}`);
        this.userDetailsRepo.getUserProfile(this.props.match.params.id)
            .then(response => {
                if (!response.ok) {
                    this.props.history.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(json => {
                this.setState({
                    profile: json,
                    loading: false,
                });
            });

        this.loadMyDetails();
    }

    loadMyDetails() {
        this.userDetailsRepo.getMyDetails()
            .then(response => {
                if (!response.ok) {
                    this.props.history.push('/signin');
                } else {
                    return response.json();
                }
            })
            .then(json => {
                this.setState({myDetails: json});
            });
    }

    isLoading() {
        return !(this.state.myDetails && this.state.profile);
    }

    shouldShowAddFriend() {
        return this.state.myDetails && this.state.profile &&
            (this.state.profile.id !== this.state.myDetails.id) &&
            (!this.isMyFriend());
    }

    isSelfAccount() {
        return (
            this.state.myDetails && this.state.profile &&
            (this.state.profile.id === this.state.myDetails.id)
        );
    }

    isMyFriend() {
        return (
            this.state.myDetails && this.state.profile &&
            (this.state.profile.id !== this.state.myDetails.id) &&
            this.state.myDetails.friend.map(friend => friend.id).includes(this.state.profile.id)
        );
    }

    addFriend() {
        this.userDetailsRepo.addFriendByUsername(this.state.profile.name)
            .then(result => {
                if (result.ok) {
                    return result.json();
                } else {
                    console.log('error could not add friend');
                }
            })
            .then(json => {
                this.loadMyDetails();
            });
    }

    render() {
        const id = this.props.match.params.id;
        if (this.isLoading()) {
            return (
                <Spinner/>
            )
        }
        return (
            <div>
                <div className="profileCover">
                    <p><br/></p>
                    <div className="profileBadge">{this.state.profile && this.state.profile.name}</div>
                </div>
                <br/><br/>
                {/*{this.isMyFriend() && (*/}
                {/*<div className="post">*/}
                {/*<p>*/}
                {/*<button>🗣 チャットに行く</button>*/}
                {/*</p>*/}
                {/*</div>*/}
                {/*)}*/}
                {this.isSelfAccount() && (
                    <div className="post">
                        URL：<br/>
                        <em>https://emoji.kaylee.jp/user/{this.props.match.params.id}</em>
                    </div>
                )}
                {this.shouldShowAddFriend() && (
                    <div className="post">
                        <button onClick={this.addFriend.bind(this)}>➕💑 友達になる</button>
                    </div>
                )}
                {this.isMyFriend() && (
                    <div className="post"><span>💮私の友達です💑</span></div>
                )}

                {this.state.profile && (
                    <div className="post">
                        <h2>{this.state.profile.name}の👫友達一覧</h2>
                        {(this.state.profile.friend.length === 0) && "〜🈳〜"}
                        <ul>
                            {this.state.profile.friend.map(friend => (
                                <li key={friend.id}>{friend.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/*<div className="post">*/}
                {/*ポスト一覧*/}
                {/*</div>*/}
            </div>
        )
    }
}
