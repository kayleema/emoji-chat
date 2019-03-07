import React, {Component} from 'react';
import ReactGA from "react-ga";
import UserRepository from "./UserRepository";
import Spinner from "./Spinner";
import flag from 'country-code-emoji';
import {CountryCodes} from './countryUtils'
import {Link} from "react-router-dom";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton, GooglePlusIcon,
    GooglePlusShareButton,
    LineIcon,
    LineShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton
} from 'react-share'

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
        this.loadProfile();
        this.loadMyDetails();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadProfile();
        }
    }

    loadProfile() {
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

    onChangeCountryCode(e) {
        this.setState({
            newCountryCode: e.target.value
        })
    }

    onChangeCountryCodeSubmit() {
        if (this.state.newCountryCode) {
            this.setState({
                editingCountry: false,
                profile: null,
            });
            this.userDetailsRepo.update({country: this.state.newCountryCode})
                .then(result => {
                    if (result.ok) {
                        return result.json();
                    }
                })
                .then(json => {
                    this.setState({
                        loading: false,
                        profile: json,
                    })
                });
        } else {
            this.setState({
                editingCountry: false,
            });
        }
    }

    getUrl() {
        return `https://emoji.kaylee.jp/${this.props.match.params.id}`;
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
                        <div style={{overflow: "hidden"}}>
                            <em style={{
                                fontFamily: "monospace",
                                fontSize: "18px"
                            }}>https://emoji.kaylee.jp/user/{this.props.match.params.id}</em>
                            <br/><br/>
                        </div>
                        <div className="formRow">
                            <FacebookShareButton url={this.getUrl()} quote="絵文字タイムに私をフォローしませんか。絵文字しか使えないSNSです。">
                                <FacebookIcon round={true} size={30}/>
                            </FacebookShareButton>
                            <TwitterShareButton url={this.getUrl()} title="絵文字タイム" hashtags={["emoji"]}>
                                <TwitterIcon round={true} size={30}/>
                            </TwitterShareButton>
                            <LineShareButton url={this.getUrl()} title="絵文字タイム">
                                <LineIcon round={true} size={30}/>
                            </LineShareButton>
                            <EmailShareButton url={this.getUrl()} subject="絵文字タウム" body="絵文字タイムに私をフォローしませんか。絵文字しか使えないSNSです。">
                                <EmailIcon round={true} size={30}/>
                            </EmailShareButton>
                            <GooglePlusShareButton url={this.getUrl()}>
                                <GooglePlusIcon round={true} size={30}/>
                            </GooglePlusShareButton>
                            <LinkedinShareButton url={this.getUrl()} title="絵文字タウム" description="絵文字タイムに私をフォローしませんか。絵文字しか使えないSNSです。">
                                <LinkedinIcon round={true} size={30}/>
                            </LinkedinShareButton>
                        </div>
                    </div>
                )}
                <div className="post">
                    <div className="formRow">
                        🌏国：{!this.state.editingCountry && (this.state.profile.country ? flag(this.state.profile.country) : "🈚")}
                        {this.state.editingCountry && (
                            <div className="selectContainer">
                                <select
                                    className="countryCode"
                                    onChange={this.onChangeCountryCode.bind(this)}
                                    defaultValue={this.state.profile.country}
                                >
                                    {CountryCodes.map((code) => (
                                        <option key={code} value={code}>
                                            {code}：{flag(code)}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={this.onChangeCountryCodeSubmit.bind(this)}>
                                    ⭕️
                                </button>
                                <button onClick={() => {
                                    this.setState({editingCountry: false});
                                }}>
                                    ❌️
                                </button>
                            </div>
                        )}
                        {!this.state.editingCountry && this.isSelfAccount() && (
                            <button style={{float: "right"}} onClick={() => {
                                this.setState({editingCountry: true});
                            }}>✏️編集</button>
                        )}
                    </div>
                </div>

                {/*{this.isSelfAccount() && (*/}
                {/*<div className="post">*/}
                {/*<div className="postHeader">🔒プライベートな情報</div>*/}
                {/*<h2>⚙️ユーザー設定</h2>*/}
                {/*<div className="selectContainer">*/}
                {/*📧：<input type="text" value="notyet@soon.io"/><button>✔️</button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*)}*/}

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
                        <div className="post">
                            {this.state.profile.friend.map(friend => (
                                <Link key={friend.id} to={`/user/${friend.id}`} className="friendIcon">
                                    {friend.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
                {/*<div className="post">*/}
                {/*ポスト一覧*/}
                {/*</div>*/}
            </div>
        )
    }
}
