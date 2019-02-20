import React, {Component} from 'react';
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            message: ''
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        fetch('/api/posts')
            .then(response => response.json())
            .then((data) => (data._embedded.posts))
            .then(posts => this.setState({
                posts: posts.sort((a, b) => (new Date(a.createdDate) > new Date(b.createdDate)) ? -1 : 1)
            }));
    }

    onSubmit(e) {
        e.preventDefault();
        const body = JSON.stringify({
            "text": this.state.message,
            "subject": "user1"
        });
        const headers = {'Content-Type': 'application/json'};
        fetch('/api/posts', {method: 'POST', headers, body})
            .then(() => {
                this.setState({
                    message: ''
                })
                this.getPosts()
            })
    }

    onChangeMessage(event) {
        // this.setState({message: event.target.value});
    }

    formatDate(date) {
        const s = date;
        const a = s.split(/[^0-9]/);
        const d = new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5] );
        return (
            d.getFullYear() + '🎍' +
            (d.getMonth() + 1) + '🌙' +
            d.getDate() + '☀️' +
            d.getHours() + '⏰' +
            d.getMinutes() + '⏲️'
        );
    }

    onSelectEmoji(emoji) {
        console.log(emoji);
        this.setState({
            message: this.state.message + emoji.native,
        });
    }

    render() {
        return (
            <div className="feed">
                <div className="post">
                    <form className="search">
                        <input
                            onChange={this.onChangeMessage.bind(this)}
                            type="text"
                            className="primary"
                            value={this.state.message}
                        />
                        <button className="primary" type="submit"
                                onClick={this.onSubmit.bind(this)}>→</button>
                    </form>
                    <Picker
                        onSelect={this.onSelectEmoji.bind(this)}
                        style={{width: '100%'}}
                        title='絵文字を選んでください'
                        emoji='smile_cat'
                        i18n={{
                            search: '検索',
                            notfound: '見つけられませんでした',
                            skintext: '肌色を選ぶ',
                            categories: {
                                search: '検索結果',
                                recent: 'よく使う',
                                people: '人',
                                nature: '動物と自然',
                                foods: '食べ物と飲み物',
                                activity: '活動',
                                places: '旅行と場所',
                                objects: '物',
                                symbols: '記号',
                                flags: '旗',
                                custom: 'Custom',
                            }
                        }}
                        emojiTooltip={false}
                        // showPreview={false}
                    />
                </div>
                {this.state.posts.map((post, index) => (
                    <div key={index} className="post">
                        <p className="postText">{post.text}</p>
                        <p className='date'>{this.formatDate(post.createdDate)}</p>
                    </div>
                ))}
            </div>
        );
    }
}