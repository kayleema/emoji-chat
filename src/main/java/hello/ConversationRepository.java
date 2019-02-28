package hello;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Set;

@RepositoryRestResource(exported = false)
public interface ConversationRepository extends CrudRepository<Conversation, Long> {
    public Set<Conversation> findAllByParticipant_Name(String name);
}
