package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final PostRepository repository;
    private final EmojiUserRepository emojiUserRepo;

    @Autowired
    public DatabaseLoader(PostRepository repository, EmojiUserRepository emojiUserRepository) {
        this.repository = repository;
        this.emojiUserRepo = emojiUserRepository;
    }

    @Override
    public void run(String... args) throws Exception {
//        this.repository.save(new Post("おはよう世界!!!"));
//        this.repository.save(new Post("おはよう世界!!!"));
        try {
            this.emojiUserRepo.findByName("kaylee");
        } catch (Exception e) {
            EmojiUser kaylee = this.emojiUserRepo.save(new EmojiUser("kaylee", "kayleepass"));

            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken("kaylee", "doesn't matter",
                            AuthorityUtils.createAuthorityList("USER")));

            SecurityContextHolder.clearContext();
        }
    }
}
