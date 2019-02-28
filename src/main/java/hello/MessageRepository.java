package hello;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepository extends CrudRepository<Message, Long> {
    public List<Message> findAllByConversation(Conversation conversation);
}
