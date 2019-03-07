package hello;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    static final String MESSAGE_PREFIX = "/topic";

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/posts")
//                .setAllowedOrigins("*")
                .setAllowedOrigins(
                        "https://localhost:8080",
                        "https://emoji.kaylee.jp",
                        "https://emoji.kaylee.jp:4443"
                )
                .withSockJS();
        registry.addEndpoint("/chat")
//                .setAllowedOrigins("*")
                .setAllowedOrigins(
                        "https://localhost:8080",
                        "https://emoji.kaylee.jp",
                        "https://emoji.kaylee.jp:4443"
                )
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker(MESSAGE_PREFIX);
        registry.setApplicationDestinationPrefixes("/app");
    }
}