import React, {Component} from 'react';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
    }

    render() {
        return (
            <div className="page">
                <h1>会話{this.props.match.params.id}</h1>
                <div className="post">

                </div>
            </div>
        )
    }
}
