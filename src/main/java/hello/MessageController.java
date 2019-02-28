package hello;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.List;

@Controller
public class MessageController {

    private SimpMessagingTemplate simpMessagingTemplate;

    private final EmojiUserService emojiUserService;

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;

    @Autowired
    public MessageController(EmojiUserService service, SimpMessagingTemplate simpMessagingTemplate,
                             MessageRepository messageRepository, ConversationRepository conversationRepository) {
        this.emojiUserService = service;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
    }

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message send(Message message, Principal principal) throws Exception {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        EmojiUser user = this.emojiUserService.findByName(principal.getName());

        message.setFrom(user);
        System.out.println(message);
        return message;
    }

    @MessageMapping("/chat/{conversationId}")
    @SendTo("/topic/messages/{conversationId}")
    public Message sendPrivate(Message message, @DestinationVariable("conversationId") Long conversationId, Principal principal) throws Exception {
        EmojiUser user = this.emojiUserService.findByName(principal.getName());

        message.setFrom(user);
        message.setConversation(conversationRepository.getById(conversationId));
        messageRepository.save(message);
        System.out.println(message);
        return message;
    }

    @SubscribeMapping("/messages/{conversationId}")
    public ChatInitializerDto newConnection(@DestinationVariable("conversationId") Long conversationId, Principal p)
            throws JsonProcessingException {
        String user = p.getName();

        System.out.print(conversationId);
        System.out.println("newConnection");
        Conversation convo = conversationRepository.getById(conversationId);
        List<Message> messageList = messageRepository.findAllByConversation(convo);
        ChatInitializerDto chatInitDto = new ChatInitializerDto(convo, messageList);
        return chatInitDto;
    }

    static class ChatInitializerDto {
        private Conversation conversation;
        private List<Message> messageList;

        public Conversation getConversation() {
            return conversation;
        }

        public void setConversation(Conversation conversation) {
            this.conversation = conversation;
        }

        public List<Message> getMessageList() {
            return messageList;
        }

        public void setMessageList(List<Message> messageList) {
            this.messageList = messageList;
        }

        public ChatInitializerDto(Conversation conversation, List<Message> messageList) {
            this.conversation = conversation;
            this.messageList = messageList;
            this.messageList = messageList;
        }
    }
}
