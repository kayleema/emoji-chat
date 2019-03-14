import SockJS from "sockjs-client"
import {Client, Message} from '@stomp/stompjs';

export default class ChatSocket {
    constructor() {
        this.newMessageCallback = null;
        this.chatInitializerCallback = null;
    }

    connect(conversationId) {
        this.conversationId = conversationId;

        this.client = new Client({
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
        });
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        if (hostname === 'emoji.cfapps.io' || hostname === 'emoji.kaylee.jp') {
            this.client.brokerURL = `wss://${hostname}:4443/posts`;
        } else {
            this.client.brokerURL = `wss://${hostname}/posts`;
        }

        console.log(this.client);

        this.client.onConnect = this.onSocketConnect.bind(this);
        this.client.onDisconnect = this.onSocketDisconnect.bind(this);
        this.client.onWebSocketClose = this.onSocketDisconnect.bind(this);

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

    setConnectCallback(callback) {
        this.connectCallback = callback;
    }

    setDisconnectCallback(callback) {
        this.disconnectCallback = callback;
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

        if (this.connectCallback) {
            this.connectCallback();
        }
    }

    onSocketDisconnect() {
        if (this.disconnectCallback) {
            this.disconnectCallback();
        }
    }

    sendMessage(message) {
        // this.client.publish({destination: '/app/chat', body: JSON.stringify({text:message})});
        this.client.publish({destination: `/app/chat/${this.conversationId}`, body: JSON.stringify({text: message})});
    }
}


export class FeedSocket {
    constructor() {
        this.newPostCallback = null;
    }

    connect() {
        this.client = new Client({
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
        });
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        if (hostname === 'emoji.cfapps.io' || hostname === 'emoji.kaylee.jp') {
            this.client.brokerURL = `wss://${hostname}:4443/posts`;
        } else {
            this.client.brokerURL = `wss://${hostname}/posts`;
        }

        console.log(this.client);

        this.client.onConnect = this.onSocketConnect.bind(this);
        this.client.onDisconnect = this.onSocketDisconnect.bind(this);
        this.client.onWebSocketClose = this.onSocketDisconnect.bind(this);

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

    deactivate() {
        this.client.deactivate();
    }

    setNewPostCallback(callback) {
        this.newPostCallback = callback;
    }

    setConnectCallback(callback) {
        this.connectCallback = callback;
    }

    setDisconnectCallback(callback) {
        this.disconnectCallback = callback;
    }

    newPost(message) {
        console.log(message);
        this.newPostCallback();
    }

    onSocketConnect(frame) {
        console.log('connected', frame);

        let subscriptionB = this.client.subscribe("/topic/newPost", this.newPost.bind(this));
        console.log('subscriptions: ', subscriptionB);

        if (this.connectCallback) {
            this.connectCallback();
        }
    }

    onSocketDisconnect() {
        if (this.disconnectCallback) {
            this.disconnectCallback();
        }
    }
}
