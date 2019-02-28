const SockJS = require('sockjs-client');
const StompJs = require('@stomp/stompjs');

export default class ChatSocket {
    constructor() {
        this.newMessageCallback = null;
        this.chatInitializerCallback = null;
    }

    connect(conversationId) {
        this.conversationId = conversationId;

        const ws = new SockJS('/posts');
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

    setNewMessageCallback(callback) {
        this.newMessageCallback = callback;
    }

    setChatInitializerCallback(callback) {
        this.chatInitializerCallback = callback;
    }

    newPostMessage(message) {
        console.log(JSON.parse(message.body));
        this.newMessageCallback(JSON.parse(message.body));
    }

    newHistory(message) {
        console.log(message);
        console.log(JSON.parse(message.body));
        if (this.chatInitializerCallback) {
            this.chatInitializerCallback(JSON.parse(message.body))
        }
    }

    onSocketConnect(frame) {
        console.log('connected', frame);

        // let subscriptionA = this.client.subscribe('/topic/messages', this.newPostMessage.bind(this));
        let subscriptionB = this.client.subscribe(`/topic/messages/${this.conversationId}`, this.newPostMessage.bind(this));
        let subscriptionS = this.client.subscribe(`/app/messages/${this.conversationId}`, this.newHistory.bind(this));
        console.log('subscriptions: ', subscriptionB, subscriptionS);
    }

    sendMessage(message) {
        // this.client.publish({destination: '/app/chat', body: JSON.stringify({text:message})});
        this.client.publish({destination: `/app/chat/${this.conversationId}`, body: JSON.stringify({text: message})});
    }
}
