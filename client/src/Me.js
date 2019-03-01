import React, {Component} from 'react';
import ReactGA from "react-ga";


export default class Me extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadFriendList();
        ReactGA.pageview("/me");
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
                this.props.history.push(`/user/${json.id}`)
            });
    }
    render() {
        return (
            <div>
                …ローディング…
            </div>
        )
    }
}
