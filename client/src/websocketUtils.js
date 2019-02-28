const SockJS = require('sockjs-client');
const StompJs = require('@stomp/stompjs');

export default class ChatSocket {
    constructor() {
        const ws = new SockJS('/chat');
        this.client = StompJs.Stomp.over(ws);

        this.client.onConnect = this.onSocketConnect.bind(this);

        this.client.onStompError = function (frame) {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };

        this.client.activate();
    }


    onSocketConnect(frame) {
        console.log('connected', frame);

        let subscription = this.client.subscribe('/topic/newMessage', this.newPostMessage.bind(this));
        console.log('subscription', subscription);
    }
}
