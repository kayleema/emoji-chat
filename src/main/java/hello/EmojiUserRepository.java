package hello;

import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface EmojiUserRepository extends Repository<EmojiUser, Long> {

    EmojiUser save(EmojiUser emojiUser);

    EmojiUser findByName(String name);

}