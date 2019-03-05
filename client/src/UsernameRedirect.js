import React, {Component} from 'react';
import Spinner from "./Spinner";


export default class UsernameRedirect extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch(`/username-lookup/${this.props.match.params.username}`, {
            method: 'GET',
            credentials: "same-origin",
            cache: "no-cache",
        })
            .then(result => {
                if (result.status !== 200) {
                    console.log(result);
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
                <Spinner/>
            </div>
        )
    }
}
