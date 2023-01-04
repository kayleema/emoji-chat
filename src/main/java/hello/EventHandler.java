package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.server.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import static hello.WebSocketConfiguration.MESSAGE_PREFIX;

@Component
@RepositoryEventHandler(Post.class)
public class EventHandler {
    private final SimpMessagingTemplate websocket;

    private final EntityLinks entityLinks;

    @Autowired
    public EventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
        this.websocket = websocket;
        this.entityLinks = entityLinks;
    }

    @HandleAfterCreate
    public void newPost(Post post) {
        this.websocket.convertAndSend(MESSAGE_PREFIX + "/newPost", getPath(post));
    }

    private String getPath(Post post) {
        return this.entityLinks.linkForItemResource(post.getClass(), post.getId()).toUri().getPath();
    }
}
