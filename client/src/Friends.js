import React, {Component} from 'react';
import EmojiInputBox from "./EmojiInputBox";


export default class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }

    onSearch(e) {
        e.preventDefault();
        this.setState({search: ''});
        fetch('/user-search/' + this.state.search, {method: 'GET'})
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
                if(json) {
                    this.setState({
                        searchResults: [json]
                    });
                }
            });
    }

    render() {
        return (
            <div className="page">
                <h1>👭👫👬・友達</h1>
                <div className="post">
                    <label>🔎
                    </label>
                    <EmojiInputBox
                        value={this.state.search}
                        onSelectEmoji={emoji => this.setState({search: this.state.search + emoji.native})}
                        onClear={e => this.setState({search: ''})}
                        buttonText="🔎🕵🏻‍♀️🔍"
                        onButtonClick={this.onSearch.bind(this)}
                    />
                    {(this.state.searchResults && this.state.searchResults.length > 0) && (
                        <div className="post">
                            {this.state.searchResults.map((user) => (
                                <p key={user.name}>

                                    {user.name}<button>➕👫追加</button>
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
                <button onClick={()=> {this.props.history.push('/');}}>🔙</button>
            </div>
        )
    }
}
